/**
 * App.jsx
 * ────────────────────────────────────────────────────────────────────
 * Point d'entrée principal de l'interface utilisateur.
 *
 * Architecture à deux composants :
 *
 *   App (racine)
 *   └── HoroscopProvider  ← injecte le contexte global
 *       └── InnerApp      ← logique et rendu de l'UI
 *
 * Ce découpage est nécessaire car useContext() doit être appelé
 * à l'intérieur du Provider — on ne peut pas le faire dans App directement.
 *
 * ─── Flow utilisateur ────────────────────────────────────────────────
 * 1. L'utilisateur choisit un signe dans SignScroller
 * 2. Il clique sur "Voir mon horoscope"
 * 3. → ViewHoroscop() est appelée :
 *       - setLoading(true) → affiche CrystalBall à la place du formulaire
 *       - fetchHoroscop(sign) → appelle le backend
 *       - setHoroscop(data) → stocke le résultat dans le contexte
 *       - setShowResults(true) → affiche ResultPanel
 * 4. L'utilisateur peut cliquer "Retour" pour revenir au formulaire
 * ────────────────────────────────────────────────────────────────────
 */

import { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import "./App.css";
import SignScroller        from "./Components/SignScroller";
import AvatarBubble       from "./Components/AvatarBubble";
import ResultPanel        from "./Components/ResultPanel";
import CrystalBall        from "./Components/CrystallBall";
import { HoroscopProvider, HoroscopContext } from "./Context/HoroscopContext";

// ─── Icône animée du bouton ─────────────────────────────────────────
// Étoile de révélation : noyau pulsant + 8 rayons qui tournent lentement.
// Représente visuellement l'acte de "révéler" quelque chose depuis les astres.
// Aucun emoji — entièrement construit en CSS.
function RevealIcon() {
  return (
    <span className="reveal-icon" aria-hidden="true">
      {/* Noyau central lumineux */}
      <span className="ri-core" />
      {/* 8 rayons répartis à 45° d'intervalle */}
      {Array.from({ length: 8 }, (_, i) => (
        <span
          key={i}
          className="ri-ray"
          style={{
            '--angle': `${i * 45}deg`,   // Position angulaire du rayon
            '--delay': `${i * 0.19}s`,   // Décalage de l'animation pour effet de vague
          }}
        />
      ))}
    </span>
  );
}

// ─── InnerApp ─────────────────────────────────────────────────────────
// Composant interne qui a accès au contexte (doit être enfant du Provider)
function InnerApp() {

  // Contrôle l'affichage : false = formulaire, true = résultats
  const [showResults, setShowResults] = useState(false);

  // ─── Récupération des valeurs du contexte global ────────────────
  const {
    selectedSign,  // Signe sélectionné par l'utilisateur dans SignScroller
    horoscop,      // Résultat de l'API (null jusqu'au premier appel)
    setHoroscop,   // Setter pour stocker le résultat
    loading,       // true pendant l'appel API (affiche CrystalBall)
    setLoading,    // Setter pour activer/désactiver le loader
    error,         // Objet Error si l'appel a échoué, sinon null
    setError,      // Setter pour enregistrer ou effacer une erreur
    fetchHoroscop, // Fonction qui appelle le backend (définie dans le contexte)
  } = useContext(HoroscopContext);

  // ─── Durée minimale d'affichage de la boule de cristal ──────────
  // Même si l'API répond instantanément (cache), la boule reste visible
  // au minimum MIN_LOADING_MS millisecondes pour une meilleure expérience.
  const MIN_LOADING_MS = 4000; // 4 secondes

  // ─── Gestionnaire principal : appel API ──────────────────────────
  // Déclenché par le clic sur "Voir mon horoscope"
  const ViewHoroscop = async () => {

    // Réinitialise les états avant chaque appel
    setLoading(true);
    setError(null);

    try {
      // Lance EN PARALLÈLE :
      //   ① L'appel API réel (retourne les données horoscope)
      //   ② Un timer de MIN_LOADING_MS (garantit la durée minimale)
      // Promise.all attend que LES DEUX soient terminés.
      // → Si l'API répond en 1s, on attend encore 3s (timer).
      // → Si l'API répond en 6s, on affiche dès qu'elle répond (timer déjà fini).
      const [data] = await Promise.all([
        fetchHoroscop(selectedSign),
        new Promise((resolve) => setTimeout(resolve, MIN_LOADING_MS)),
      ]);

      setHoroscop(data);     // Stocke le résultat dans le contexte global
      setShowResults(true);  // Bascule l'affichage vers ResultPanel

    } catch (err) {
      // En cas d'erreur : on attend quand même la durée minimale
      // (le timer tourne en parallèle de l'appel raté aussi)
      setError(err);
      setShowResults(true);

    } finally {
      // Ce bloc s'exécute toujours (succès ou erreur)
      setLoading(false); // Stoppe le loader CrystalBall
    }
  };

  // ─── Retour au formulaire ─────────────────────────────────────────
  // Réinitialise l'affichage pour permettre de choisir un autre signe
  const handleBack = () => setShowResults(false);

  // ─── Rendu ───────────────────────────────────────────────────────
  return (
    /*
      Container principal Bootstrap :
      - min-vh-100 → occupe au minimum toute la hauteur de l'écran
      - m-0 → supprime les marges Bootstrap par défaut
      - position: relative → nécessaire pour le positionnement absolu
        de la bulle de dialogue (AvatarBubble / speech-bubble dans App.css)
    */
    <div className="container-fluid min-vh-100 d-flex flex-column px-3 py-2 py-md-3" style={{ position: "relative" }}>

      {/* ── En-tête avec Logo AstroScope ── */}
      <header className="app-header">
        <img
          src="/AstroScope_logo.png"
          alt="AstroScope Logo"
          className="app-logo"
          onClick={handleBack}
          title="AstroScope - Retour à l'accueil"
        />
      </header>

      <div className="row w-100 justify-content-center align-items-center flex-grow-1">

        {/* ── Colonne gauche : bulle en haut, avatar en bas avec effets ── */}
        <div className="col-12 col-md-5 col-lg-4 d-flex flex-column align-items-center mb-4 mb-md-0 avatar-col">

          {/*
            Bulle de dialogue AVANT l'avatar dans le DOM
            → elle apparaît au-dessus visuellement, avec la queue qui pointe vers l'avatar
          */}
          <AvatarBubble />

          {/*
            Wrapper de l'avatar : contient l'aura + les étincelles + l'image
            Tous les effets décoratifs sont positionnés en absolu dans ce wrapper
          */}
          <div className="avatar-wrapper">
            {/* Aura magique au sol (halo violacé sous les pieds) */}
            <div className="avatar-aura" aria-hidden="true" />

            {/* Étincelles flottantes autour de l'avatar */}
            <span className="avatar-spark sp-1" aria-hidden="true" />
            <span className="avatar-spark sp-2" aria-hidden="true" />
            <span className="avatar-spark sp-3" aria-hidden="true" />
            <span className="avatar-spark sp-4" aria-hidden="true" />

            {/* Image de l'avatar KLO */}
            <img src="/avatar-horoscope.webp" alt="Avatar KLO" className="avatar" />
          </div>

        </div>

        {/* ── Colonne droite : formulaire OU résultats ── */}
        <div className="col-12 col-md-7 col-lg-6">
          {/*
            Logique d'affichage (priorité de gauche à droite) :
            1. Si loading=true  → affiche la boule de cristal (loader)
            2. Si showResults=false → affiche le formulaire (SignScroller + bouton)
            3. Si showResults=true  → affiche les résultats (ResultPanel)
          */}
          {loading ? (

            // ── État : chargement en cours ──
            <CrystalBall />

          ) : !showResults ? (

            // ── État : formulaire de sélection ──
            <div style={{ width: "100%" }}>
              {/* Grille zodiacale glassmorphism (3 colonnes) */}
              <SignScroller />
              {/*
                📌 Pour activer la sélection du jour :
                   Décommenter la ligne suivante et importer DaySelect en haut
                <DaySelect />
              */}
              {/* Bouton déclencheur de l'appel API */}
              <button
                className="btn-card"
                style={{ marginTop: "16px" }}
                onClick={ViewHoroscop}
                disabled={loading}
              >
                <RevealIcon />
                {loading ? "Chargement…" : "Révèle mon horoscope"}
              </button>
            </div>

          ) : (

            // ── État : résultats affichés ──
            <ResultPanel
              data={horoscop}         // Données retournées par l'API
              sign={selectedSign}     // Signe sélectionné (pour l'icône et le label)
              loading={loading}       // Passé pour une éventuelle gestion dans ResultPanel
              error={error}           // Objet Error si l'appel a échoué
              onBack={handleBack}     // Callback pour revenir au formulaire
            />
          )}
        </div>

      </div>
    </div>
  );
}

// ─── App (racine) ──────────────────────────────────────────────────────
// Enveloppe InnerApp avec HoroscopProvider pour exposer le contexte global
// à tous les composants de l'arbre.
//
// 📌 Pour ajouter d'autres providers (ex: ThemeContext, AuthContext) :
//    les imbriquer ici autour de InnerApp
function App() {
  return (
    <HoroscopProvider>
      <InnerApp />
    </HoroscopProvider>
  );
}

export default App;
