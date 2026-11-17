
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import axios from "axios";
import cors from "cors";
import NodeCache from "node-cache";
import * as deepl from "deepl-node";

import { clearCache } from "./utils/ClearCache.js";

const app = express();
app.use(cors());
app.use(express.json());

const cache = new NodeCache();

// Initialisation du traducteur DeepL
const getDeepLTranslator = () => {
  const key = process.env.DEEPL_API_KEY;
  return key ? new deepl.Translator(key) : null;
};


app.get("/horoscope/:sign", async (req, res) => {

  const { sign } = req.params;

  const now = new Date()
  const pad = (n) => String(n).padStart(2, 0)
  // ✅ FIX 1 : getFullYear() avec parenthèses (était une référence de fonction)
  // ✅ FIX 2 : clé inclut le signe pour éviter que tous les signes partagent le même cache
  const cacheKey = `${sign}-${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;



  const cached = cache.get(cacheKey);


  if (cached) {

    console.log('ok dans le cache');
    return res.json(cached);
  }


  try {
    const apiKey = process.env.API_NINJAS_KEY;
    if (!apiKey) {
      console.error("❌ ERREUR: La variable API_NINJAS_KEY n'est pas définie dans l'environnement !");
      return res.status(500).json({ error: "API_NINJAS_KEY manquante dans l'environnement du serveur." });
    }

    const response = await axios.get("https://api.api-ninjas.com/v1/horoscope", {
      params: { zodiac: sign },
      headers: { "X-Api-Key": apiKey },
    });

    const englishText = response.data?.horoscope;
    if (!englishText) {
      return res.status(500).json({ error: "Aucun texte d'horoscope retourné par l'API Ninjas." });
    }

    // Traduction haute fidélité (DeepL en priorité + Google en secours)
    let finalText = englishText;

    // 1. DeepL (Qualité premium naturelle, non mot-à-mot)
    const translator = getDeepLTranslator();
    if (translator) {
      try {
        const result = await translator.translateText(englishText, null, "fr");
        if (result && result.text) {
          finalText = result.text;
        }
      } catch (deepLErr) {
        console.warn("⚠️ DeepL temporairement indisponible :", deepLErr.message);
      }
    }

    // 2. Moteur de secours : Google Translate (si DeepL non configuré ou quota épuisé)
    if (finalText === englishText) {
      try {
        const gRes = await axios.get("https://translate.googleapis.com/translate_a/single", {
          params: {
            client: "gtx",
            sl: "en",
            tl: "fr",
            dt: "t",
            q: englishText,
          },
          timeout: 5000,
        });

        if (gRes.data && Array.isArray(gRes.data[0])) {
          finalText = gRes.data[0].map((item) => item[0]).join("");
        }
      } catch (gErr) {
        console.warn("⚠️ Moteur de secours indisponible :", gErr.message);
      }
    }

    const lastData = { ...response.data, horoscope: finalText };
    cache.set(cacheKey, lastData, clearCache());
    return res.json(lastData);

  } catch (err) {
    const errorDetails = err.response?.data || err.message;
    console.error("❌ Erreur serveur :", errorDetails);
    return res.status(500).json({
      error: typeof errorDetails === "object" ? JSON.stringify(errorDetails) : errorDetails,
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
