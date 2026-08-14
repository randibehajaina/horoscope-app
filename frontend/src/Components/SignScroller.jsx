/**
 * SignScroller.jsx — v2.0 ✨ "Grille Zodiacale"
 * ────────────────────────────────────────────────────────────────────
 * Affiche les 12 signes du zodiaque sous forme de grille de cartes
 * glassmorphism (3 colonnes × 4 lignes) avec :
 *   - Icône du signe + symbole astrologique + nom + dates
 *   - Effet hover (translation + lueur violette)
 *   - État actif : bordure brillante + fond violet + scale
 *   - Animation d'entrée décalée par carte (stagger effect)
 *
 * 📌 Pour modifier les signes → SIGNS (key, label, symbol, dates)
 * 📌 Pour changer le rayon de l'orbite des icônes → signe-card-icon width/height
 * ────────────────────────────────────────────────────────────────────
 */

import { useContext } from "react";
import { HoroscopContext } from "../Context/HoroscopContext";

// ─── Données des 12 signes ────────────────────────────────────────────
// key    → identifiant API (anglais minuscule)
// label  → nom affiché (français)
// symbol → glyphe Unicode astrologique
// dates  → période du signe
const SIGNS = [
  { key: "aries",       label: "Bélier",     symbol: "♈", dates: "21 mar – 19 avr" },
  { key: "taurus",      label: "Taureau",    symbol: "♉", dates: "20 avr – 20 mai" },
  { key: "gemini",      label: "Gémeaux",    symbol: "♊", dates: "21 mai – 20 jun" },
  { key: "cancer",      label: "Cancer",     symbol: "♋", dates: "21 jun – 22 jul" },
  { key: "leo",         label: "Lion",       symbol: "♌", dates: "23 jul – 22 aoû" },
  { key: "virgo",       label: "Vierge",     symbol: "♍", dates: "23 aoû – 22 sep" },
  { key: "libra",       label: "Balance",    symbol: "♎", dates: "23 sep – 22 oct" },
  { key: "scorpio",     label: "Scorpion",   symbol: "♏", dates: "23 oct – 21 nov" },
  { key: "sagittarius", label: "Sagittaire", symbol: "♐", dates: "22 nov – 21 déc" },
  { key: "capricorn",   label: "Capricorne", symbol: "♑", dates: "22 déc – 19 jan" },
  { key: "aquarius",    label: "Verseau",    symbol: "♒", dates: "20 jan – 18 fév" },
  { key: "pisces",      label: "Poissons",   symbol: "♓", dates: "19 fév – 20 mar" },
];

// ─── Composant ────────────────────────────────────────────────────────
export default function SignScroller() {

  // Signe actuellement sélectionné + setter (depuis le contexte global)
  const { selectedSign, setSelectedSign } = useContext(HoroscopContext);

  return (
    <div className="sign-grid-wrapper">

      {/*
        Titre de section avec décoration runique
        📌 Pour supprimer le titre → retirer ce bloc
      */}
      <div className="sign-grid-header">
        <span className="sign-grid-deco" aria-hidden="true">✦</span>
        <h2 className="sign-grid-title">Choisis ton signe</h2>
        <span className="sign-grid-deco" aria-hidden="true">✦</span>
      </div>

      {/*
        Grille 3 colonnes de cartes zodiacales
        custom-scroll → barre de défilement fine (définie dans App.css)
      */}
      <div className="sign-grid custom-scroll">
        {SIGNS.map((sign, index) => {
          const isActive = selectedSign === sign.key;

          return (
            <button
              key={sign.key}
              onClick={() => setSelectedSign(sign.key)}
              className={`sign-card ${isActive ? "sign-card--active" : ""}`}
              // Délai d'animation d'entrée décalé selon la position de la carte
              style={{ animationDelay: `${index * 40}ms` }}
              aria-pressed={isActive}
              aria-label={`${sign.label} ${sign.symbol}, ${sign.dates}`}
            >
              {/* Icône PNG du signe */}
              <img
                src={`/icons/${sign.key}.png`}
                alt=""                          // Alt vide car aria-label sur le bouton
                className="sign-card__icon"
                loading="lazy"
                width={44}
                height={44}
              />

              {/* Nom du signe */}
              <span className="sign-card__name">{sign.label}</span>

              {/* Période du signe */}
              <span className="sign-card__dates">{sign.dates}</span>

              {/* Lueur active (visible uniquement si isActive) */}
              {isActive && <div className="sign-card__glow" aria-hidden="true" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
