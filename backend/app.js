
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import axios from "axios";
import cors from "cors";
import NodeCache from "node-cache";

import { clearCache } from "./utils/ClearCache.js";

const app = express();
app.use(cors());
app.use(express.json());

const cache = new NodeCache();


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

    // Traduction avec fallback sécurisé (ne fait plus planter si MyMemory dépasse son quota)
    let finalText = englishText;
    try {
      const resTranslated = await axios.get("https://api.mymemory.translated.net/get", {
        params: {
          q: englishText,
          langpair: "en|fr",
        },
        timeout: 6000,
      });

      const translated = resTranslated.data?.responseData?.translatedText;
      if (translated && !resTranslated.data?.quotaFinished) {
        finalText = translated;
      }
    } catch (transErr) {
      console.warn("⚠️ Échec de la traduction, conservation du texte anglais :", transErr.message);
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
