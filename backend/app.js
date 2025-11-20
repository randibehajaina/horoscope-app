
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
  const pad = (n) => String(n).padStart(2,0)
  const cacheKey = `${now.getFullYear}-${pad(now.getMonth() + 1 )}-${pad(now.getDate())}`;



  const cached = cache.get(cacheKey);


  if (cached) {

    console.log('ok dans le cache');
    return res.json(cached);
  }


  try {
    const response = await axios.get("https://api.api-ninjas.com/v1/horoscope", {
      params: { zodiac:sign },
      headers: { "X-Api-Key": process.env.API_NINJAS_KEY },
    });

    const englishText = response.data.horoscope;

    const resTranslated = await axios.get("https://api.mymemory.translated.net/get", {

      params: {
        q: englishText,
        langpair: "en|fr",
     
      },
    });

    const frenchText = resTranslated.data.responseData.translatedText
    let lastData 

    if(resTranslated.data.quotaFinished){

      lastData = {...response.data}

    }else{lastData = {...response.data , horoscope : frenchText}}
    
    cache.set(cacheKey, lastData , clearCache())
    res.json(lastData)
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(process.env.PORT, () => console.log("Backend running on port 5000"));
