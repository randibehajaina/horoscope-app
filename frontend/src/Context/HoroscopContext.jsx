/**
 * HoroscopContext.jsx
 * ────────────────────────────────────────────────────────────────────
 * Contexte global de l'application horoscope.
 *
 * Ce fichier regroupe TOUT le state partagé entre les composants
 * (signe sélectionné, jour, résultat, loading, erreur) ainsi que
 * la fonction d'appel API fetchHoroscop.
 *
 * 📌 Pour ajouter un nouvel état global :
 *   1. Déclare un useState ici
 *   2. Expose-le dans l'objet `value` du Provider
 *   3. Importe-le via useContext(HoroscopContext) dans n'importe quel enfant
 * ────────────────────────────────────────────────────────────────────
 */

import { createContext, useState } from "react";
import axios from "axios";

// ─── Création du contexte ────────────────────────────────────────────
// HoroscopContext est l'objet à importer dans les composants enfants
// pour accéder au state global via useContext(HoroscopContext)
export const HoroscopContext = createContext();

// ─── URL du backend ──────────────────────────────────────────────────
// Centraliser l'URL ici permet de la modifier en un seul endroit
// En prod (Vercel) : utilise VITE_API_URL, en local : repli sur localhost:5000
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// ─── Provider ────────────────────────────────────────────────────────
// HoroscopProvider enveloppe l'app et donne accès au contexte
// à tous ses composants enfants (via <HoroscopProvider> dans App.jsx)
export const HoroscopProvider = ({ children }) => {

  // Signe du zodiaque actuellement sélectionné par l'utilisateur
  // Valeur par défaut : "aries" (Bélier) — clé utilisée dans l'URL API
  const [selectedSign, setSelectedSign] = useState("aries");

  // Jour de l'horoscope : "today" | "tomorrow" | "yesterday"
  // 📌 Ce state est prévu pour être utilisé avec DaySelect.jsx
  const [day, setDay] = useState("today");

  // Résultat brut retourné par le backend
  // Structure attendue : { sign, date, horoscope }
  const [horoscop, setHoroscop] = useState(null);

  // Indicateur de chargement : true pendant l'appel API
  const [loading, setLoading] = useState(false);

  // Erreur capturée si l'appel API échoue (objet Error ou null)
  const [error, setError] = useState(null);

  // ─── Fonction principale : appel API ──────────────────────────────
  // Envoie une requête GET au backend proxy qui se charge lui-même
  // d'appeler api-ninjas et de traduire le texte en français.
  //
  // @param {string} sign - Clé anglaise du signe (ex: "aries", "libra")
  // @returns {Object} - Les données de l'horoscope (sign, date, horoscope)
  // @throws {Error} - Relance l'erreur pour qu'App.jsx puisse l'afficher
  const fetchHoroscop = async (sign) => {
    try {
      // GET /horoscope/:sign — le backend gère le cache et la traduction
      const response = await axios.get(`${API_BASE_URL}/horoscope/${sign}`);
      return response.data;
    } catch (err) {
      console.error("❌ Erreur lors de l'appel API :", err.message);
      throw err; // Remonte l'erreur pour être gérée dans App.jsx
    }
  };

  // ─── Valeurs exposées aux composants enfants ───────────────────────
  return (
    <HoroscopContext.Provider
      value={{
        // ─ État du formulaire ─
        selectedSign,   // Signe actuellement sélectionné
        setSelectedSign, // Setter pour changer le signe (utilisé par SignScroller)

        day,            // Jour sélectionné ("today" | "tomorrow" | "yesterday")
        setDay,         // Setter pour changer le jour (utilisé par DaySelect)

        // ─ État du résultat ─
        horoscop,       // Données brutes de l'API (null si pas encore chargé)
        setHoroscop,    // Setter (utilisé par App.jsx après l'appel API)

        // ─ États de l'UI ─
        loading,        // true = spinner/boule de cristal affiché
        setLoading,     // Setter (activé avant l'appel, désactivé après)

        error,          // Objet Error si l'appel a échoué, sinon null
        setError,       // Setter pour réinitialiser ou enregistrer une erreur

        // ─ Actions ─
        fetchHoroscop,  // Fonction d'appel API à déclencher sur le bouton
      }}
    >
      {children}
    </HoroscopContext.Provider>
  );
};