/**
 * AvatarBubble.jsx
 * ────────────────────────────────────────────────────────────────────
 * Composant bulle de dialogue animée (effet "machine à écrire").
 *
 * Affiche progressivement le texte d'introduction de l'avatar KLO,
 * lettre par lettre, avec un délai configurable entre chaque caractère.
 *
 * 📌 Pour modifier le texte de la bulle :
 *   → Changer la constante FULL_TEXT ci-dessous
 *
 * 📌 Pour accélérer / ralentir l'animation :
 *   → Modifier TYPING_SPEED (en millisecondes par caractère)
 *   Ex: 10 = très rapide, 50 = lent et dramatique
 * ────────────────────────────────────────────────────────────────────
 */

import { useEffect, useState } from "react";

// ─── Configuration ────────────────────────────────────────────────────
// Texte complet affiché dans la bulle (affiché lettre par lettre)
const FULL_TEXT = `Bonjour ! Moi, c'est KLO 🌟
Je peux te révéler ton horoscope d'aujourd'hui 👀
Choisis ton signe et découvre ce que les astres ont à te dire`;

// Vitesse de frappe en millisecondes par caractère
const TYPING_SPEED = 20;

// ─── Composant ────────────────────────────────────────────────────────
function AvatarBubble() {

  // Texte actuellement affiché (grandit lettre par lettre)
  const [displayedText, setDisplayedText] = useState("");

  // Index du prochain caractère à ajouter
  const [currentIndex, setCurrentIndex] = useState(0);

  // ─── Effet typewriter ─────────────────────────────────────────────
  // Ajoute un caractère toutes les TYPING_SPEED ms
  // L'effet se relance automatiquement à chaque fois que currentIndex change
  useEffect(() => {
    // Condition d'arrêt : on a affiché tous les caractères
    if (currentIndex >= FULL_TEXT.length) return;

    const timer = setTimeout(() => {
      // Ajoute le prochain caractère à la fin du texte déjà affiché
      setDisplayedText((prev) => prev + FULL_TEXT[currentIndex]);
      // Avance l'index pour le prochain render
      setCurrentIndex((prev) => prev + 1);
    }, TYPING_SPEED);

    // Nettoyage : annule le timer si le composant est démonté entre-temps
    // (évite les memory leaks si l'utilisateur navigue rapidement)
    return () => clearTimeout(timer);

  }, [currentIndex]); // Se redéclenche à chaque nouvel index

  // ─── Rendu ───────────────────────────────────────────────────────
  return (
    <>
      {/*
        La bulle est positionnée en absolu par rapport au container parent
        (voir .speech-bubble dans App.css pour la position et la flèche décorative)
      */}
      <div className="speech-bubble">
        <strong>{displayedText}</strong>
        {/* 📌 Optionnel : ajouter ici un curseur clignotant pendant la frappe
            ex: {currentIndex < FULL_TEXT.length && <span className="cursor">|</span>} */}
      </div>
    </>
  );
}

export default AvatarBubble;