/**
 * DaySelect.jsx
 * ────────────────────────────────────────────────────────────────────
 * Composant de sélection du jour de l'horoscope.
 *
 * Permet à l'utilisateur de choisir entre :
 *   - "yesterday" → Hier
 *   - "today"     → Aujourd'hui (valeur par défaut)
 *   - "tomorrow"  → Demain
 *
 * 📌 Pour l'utiliser dans l'app : l'importer dans App.jsx et l'ajouter
 *    dans le formulaire principal (à côté du SignScroller).
 *    Le state `day` est déjà disponible dans HoroscopContext.
 *
 * ⚠️ Ce composant est déclaré mais pas encore monté dans App.jsx
 *    (fonctionnalité prévue pour une prochaine itération)
 * ────────────────────────────────────────────────────────────────────
 */

import { useContext } from "react";
// ✅ FIX : import avec la bonne casse (Context avec C majuscule)
import { HoroscopContext } from "../Context/HoroscopContext";

// ─── Composant ────────────────────────────────────────────────────────
export default function DaySelect() {

  // Récupère le jour actuel et la fonction pour le changer depuis le contexte global
  const { day, setDay } = useContext(HoroscopContext);

  return (
    <select
      value={day}
      onChange={(e) => setDay(e.target.value)}  // Met à jour le contexte global
      className="p-2 bg-transparent text-white daySelect"
      // Accessibilité : label pour lecteurs d'écran
      aria-label="Sélectionner le jour de l'horoscope"
    >
      {/* Les valeurs correspondent aux paramètres attendus par l'API */}
      <option value="yesterday">Hier</option>
      <option value="today">Aujourd'hui</option>
      <option value="tomorrow">Demain</option>
    </select>
  );
}
