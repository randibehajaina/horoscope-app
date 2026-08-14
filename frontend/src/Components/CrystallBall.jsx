/**
 * CrystallBall.jsx — v2.0 ✨ "Sphère Mystique"
 * ────────────────────────────────────────────────────────────────────
 * Loader animé ultra-immersif affiché pendant l'appel API.
 *
 * Éléments visuels :
 *   ① Halos pulsants concentriques (fond)
 *   ② 3 anneaux orbitaux en 3D avec gemmes lumineuses
 *   ③ Boule de cristal :
 *       - Fond galactique tournant (conic-gradient)
 *       - 3 nébuleuses colorées qui dérivent
 *       - Étoiles scintillantes générées aléatoirement
 *       - Éclairs SVG animés
 *       - Ondes d'énergie centrifuges
 *   ④ 8 runes mystiques en orbite autour de la boule
 *   ⑤ Socle lumineux avec inscription runique
 *   ⑥ Message de chargement (typewriter qui change toutes les 3s)
 *
 * 📌 Pour modifier le nombre d'étoiles → STAR_COUNT
 * 📌 Pour changer les runes → RUNE_SYMBOLS
 * 📌 Pour changer les messages → MESSAGES
 * ────────────────────────────────────────────────────────────────────
 */

import { useState, useEffect } from 'react';
import '../CrystalBall.css';

// ─── Configuration ────────────────────────────────────────────────────
const STAR_COUNT    = 45;                                          // Nb d'étoiles dans la boule
const ORBIT_SECS    = 12;                                          // Durée d'une orbite complète (secondes)
const MSG_INTERVAL  = 3000;                                        // Délai entre deux messages (ms)
const TYPING_SPEED  = 45;                                          // Délai entre chaque lettre (ms)

// Symboles runiques affichés en orbite autour de la boule
const RUNE_SYMBOLS = ['✦', '⋆', '✧', '☽', '⍟', '✺', '❋', '◈'];

// Messages affichés lettre par lettre sous la boule
const MESSAGES = [
  'Les astres se consultent…',
  'La brume se lève…',
  'Les étoiles parlent…',
  'Le destin se révèle…',
  'L\'univers s\'ouvre…',
];

// ─── Composant ────────────────────────────────────────────────────────
export default function CrystalBall() {

  // Tableau des étoiles (généré une seule fois au montage)
  const [stars, setStars] = useState([]);

  // Typewriter : texte affiché, index du message et index du caractère courant
  const [displayedMsg, setDisplayedMsg] = useState('');
  const [msgIndex,     setMsgIndex]     = useState(0);
  const [charIndex,    setCharIndex]    = useState(0);

  // ─── Génération des étoiles ──────────────────────────────────────
  // Chaque étoile a une position, taille, et délai aléatoires
  useEffect(() => {
    setStars(
      Array.from({ length: STAR_COUNT }, (_, i) => ({
        id:       i,
        x:        Math.random() * 100,            // position X dans la boule (%)
        y:        Math.random() * 100,            // position Y dans la boule (%)
        size:     Math.random() * 2.5 + 0.5,     // taille entre 0.5px et 3px
        delay:    Math.random() * 4,              // délai d'animation (0 à 4s)
        duration: 1 + Math.random() * 2,          // durée du scintillement (1 à 3s)
      }))
    );
  }, []); // [] → une seule exécution au montage

  // ─── Rotation des messages toutes les MSG_INTERVAL ms ────────────
  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex(prev => (prev + 1) % MESSAGES.length); // passe au message suivant
      setCharIndex(0);      // remet l'index de caractère à zéro
      setDisplayedMsg('');  // efface le texte affiché
    }, MSG_INTERVAL);
    return () => clearInterval(interval); // nettoyage au démontage
  }, []);

  // ─── Effet typewriter ─────────────────────────────────────────────
  // Ajoute une lettre par TYPING_SPEED ms jusqu'à la fin du message
  useEffect(() => {
    const fullMessage = MESSAGES[msgIndex];
    if (charIndex >= fullMessage.length) return; // message complet → stop

    const timer = setTimeout(() => {
      setDisplayedMsg(prev => prev + fullMessage[charIndex]);
      setCharIndex(prev => prev + 1);
    }, TYPING_SPEED);

    return () => clearTimeout(timer); // nettoyage si le composant se démonte
  }, [charIndex, msgIndex]);

  // ─── Rendu ────────────────────────────────────────────────────────
  return (
    <div className="mystic-scene">

      {/*
        ① Wrapper de la boule : contient tous les éléments
           positionnés AUTOUR de la sphère (halos, anneaux, runes)
           Les éléments absolus se positionnent par rapport à ce wrapper.
      */}
      <div className="ball-wrapper">

        {/* Halos pulsants (de l'intérieur vers l'extérieur) */}
        <div className="mystic-halo halo-1" />
        <div className="mystic-halo halo-2" />
        <div className="mystic-halo halo-3" />

        {/*
          Anneaux orbitaux en 3D (preserve-3d sur le parent)
          Chaque anneau est incliné selon un axe différent et tourne en continu
          📌 Pour ajouter un anneau : copier ring-a et changer la classe + anim CSS
        */}
        <div className="orbital-sys">
          <div className="orbit-ring ring-a">
            <div className="orbit-gem gem-gold" />  {/* gemme dorée */}
          </div>
          <div className="orbit-ring ring-b">
            <div className="orbit-gem gem-blue" />  {/* gemme bleue */}
          </div>
          <div className="orbit-ring ring-c">
            <div className="orbit-gem gem-pink" />  {/* gemme rose */}
          </div>
        </div>

        {/*
          Runes mystiques en orbite autour de la boule
          Chaque rune est décalée avec un animationDelay négatif pour
          qu'elles soient uniformément réparties DÈS le premier rendu
          (négatif = la rune "démarre" à mi-chemin de son orbite)
        */}
        <div className="rune-sys">
          {RUNE_SYMBOLS.map((symbol, i) => (
            <div
              key={i}
              className="rune-orbit"
              style={{
                animationDuration: `${ORBIT_SECS}s`,
                // Décalage = -(index / total) × durée_totale
                // Ex: rune[2] sur 8 démarre à -3s → position 90° dans l'orbite
                animationDelay: `${-(i * ORBIT_SECS) / RUNE_SYMBOLS.length}s`,
              }}
            >
              {/*
                .rune-char tourne en sens inverse pour rester "droit" pendant l'orbite
                (la rotation du wrapper est annulée par la contre-rotation du span)
                → animation-duration et animation-delay hérités du parent
              */}
              <span className="rune-char">{symbol}</span>
            </div>
          ))}
        </div>

        {/*
          ② Sphère de cristal principale — overflow:hidden pour que tout
             ce qui est dessiné à l'intérieur soit clippé sur la forme ronde
        */}
        <div className="crystal-sphere">

          {/* Fond galactique : conic-gradient qui tourne (effet "spirale") */}
          <div className="gal-core" />
          {/* Overlay galactique en sens inverse (profondeur et complexité) */}
          <div className="gal-overlay" />

          {/* Nébuleuses colorées qui dérivent lentement */}
          <div className="nebula neb-1" />  {/* violet clair */}
          <div className="nebula neb-2" />  {/* indigo */}
          <div className="nebula neb-3" />  {/* rose magenta */}

          {/* Étoiles scintillantes (générées aléatoirement dans useEffect) */}
          {stars.map(star => (
            <div
              key={star.id}
              className="star-dot"
              style={{
                left:              `${star.x}%`,
                top:               `${star.y}%`,
                width:             `${star.size}px`,
                height:            `${star.size}px`,
                animationDelay:    `${star.delay}s`,
                animationDuration: `${star.duration}s`,
              }}
            />
          ))}

          {/*
            Éclairs d'énergie SVG animés via stroke-dashoffset
            📌 Pour ajouter un éclair : copier une <polyline> et modifier les points
          */}
          <svg className="lightning-svg" viewBox="0 0 200 200" aria-hidden="true">
            <polyline className="bolt bolt-1" points="75,15 55,90 92,90 65,185" />
            <polyline className="bolt bolt-2" points="130,20 108,88 144,88 118,180" />
            <polyline className="bolt bolt-3" points="25,65 75,100 100,55 155,95 175,45" />
          </svg>

          {/* Ondes d'énergie centrifuges (3 vagues décalées dans le temps) */}
          <div className="e-wave wave-1" />
          <div className="e-wave wave-2" />
          <div className="e-wave wave-3" />

          {/* Effets optiques de la sphère (reflets, brillances, bordure) */}
          <div className="sph-shine" />       {/* dégradé de brillance général */}
          <div className="sph-highlight" />   {/* spot lumineux en haut à gauche */}
          <div className="sph-rim" />         {/* reflet secondaire en bas à droite */}
          <div className="sph-border" />      {/* bordure lumineuse périphérique */}

        </div>
      </div>
      {/* fin .ball-wrapper */}

      {/*
        ③ Socle mystique (hors du wrapper pour être positionné en dessous)
           Composé : halo de sol + fût + base + inscription runique
      */}
      <div className="mystic-stand">
        <div className="stand-glow" />    {/* aura violette sous la base */}
        <div className="stand-shaft" />   {/* fût trapézoïdal */}
        <div className="stand-base" />    {/* socle horizontal */}
        {/* Inscription runique décorative — changer le contenu librement */}
        <p className="stand-runes" aria-hidden="true">✦ ☽ ✧ ☉ ✧ ☽ ✦</p>
      </div>

      {/*
        ④ Message de chargement avec effet typewriter
           Le texte change toutes les MSG_INTERVAL ms
           Le curseur clignote via CSS animation
      */}
      <p className="loading-text">
        {displayedMsg}
        <span className="text-cursor" aria-hidden="true" />
      </p>

    </div>
  );
}