/**
 * InfoCard.jsx
 * ────────────────────────────────────────────────────────────────────
 * Composant carte générique pour afficher une paire titre / valeur.
 *
 * Utilisable dans ResultPanel pour structurer les informations de
 * l'horoscope (date, signe, score, etc.).
 *
 * 📌 Exemple d'utilisation :
 *   <InfoCard title="📆 Date" value="12 août 2026" />
 *   <InfoCard title="⭐ Énergie" value="Haute" />
 *
 * @param {string} title - Libellé de la carte (peut contenir un emoji)
 * @param {string} value - Valeur affichée sous le titre
 * ────────────────────────────────────────────────────────────────────
 */

export default function InfoCard({ title, value }) {
  return (
    /*
      Carte glassmorphism : fond semi-transparent avec flou d'arrière-plan
      📌 Pour changer le style : modifier les classes Bootstrap ou ajouter
         un style inline ici
    */
    <div className="card bg-dark text-white p-3 shadow-sm">
      {/* Titre de la carte (ex: "📆 Date", "🌙 Humeur") */}
      <h6 className="mb-2">{title}</h6>
      {/* Valeur correspondante */}
      <p className="mb-0">{value}</p>
    </div>
  );
}
