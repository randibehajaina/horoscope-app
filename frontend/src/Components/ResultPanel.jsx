/**
 * ResultPanel.jsx — v3.0
 * ────────────────────────────────────────────────────────────────────
 * Panneau résultat avec :
 *   - Date formatée en français ("mercredi 12 août 2026") dans l'en-tête
 *   - Éléments animés en CSS pur (pas d'emojis) :
 *       🔴 Feu   → 3 flammes qui vacillent
 *       🔵 Eau   → vagues qui défilent
 *       ⚪ Air   → lignes de vent qui soufflent
 *       🟢 Terre → particules qui montent du sol
 * ────────────────────────────────────────────────────────────────────
 */

// ─── Données des signes ───────────────────────────────────────────────
const SIGN_DATA = {
  aries:       { label: "Bélier",     dates: "21 mar – 19 avr", element: "fire",  elementLabel: "Feu"      },
  taurus:      { label: "Taureau",    dates: "20 avr – 20 mai", element: "earth", elementLabel: "Terre"    },
  gemini:      { label: "Gémeaux",    dates: "21 mai – 20 jun", element: "air",   elementLabel: "Air"      },
  cancer:      { label: "Cancer",     dates: "21 jun – 22 jul", element: "water", elementLabel: "Eau"      },
  leo:         { label: "Lion",       dates: "23 jul – 22 aoû", element: "fire",  elementLabel: "Feu"      },
  virgo:       { label: "Vierge",     dates: "23 aoû – 22 sep", element: "earth", elementLabel: "Terre"    },
  libra:       { label: "Balance",    dates: "23 sep – 22 oct", element: "air",   elementLabel: "Air"      },
  scorpio:     { label: "Scorpion",   dates: "23 oct – 21 nov", element: "water", elementLabel: "Eau"      },
  sagittarius: { label: "Sagittaire", dates: "22 nov – 21 déc", element: "fire",  elementLabel: "Feu"      },
  capricorn:   { label: "Capricorne", dates: "22 déc – 19 jan", element: "earth", elementLabel: "Terre"    },
  aquarius:    { label: "Verseau",    dates: "20 jan – 18 fév", element: "air",   elementLabel: "Air"      },
  pisces:      { label: "Poissons",   dates: "19 fév – 20 mar", element: "water", elementLabel: "Eau"      },
};

// ─── Formatage de la date ─────────────────────────────────────────────
// Convertit "2026-08-12" → "mercredi 12 août 2026"
// 📌 Changer les options toLocaleDateString pour ajuster le format
const formatDate = (dateStr) => {
  if (!dateStr || dateStr === "—") return null;
  try {
    // On ajoute T12:00:00 pour éviter le décalage de fuseau horaire
    const date = new Date(`${dateStr}T12:00:00`);
    return date.toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return dateStr; // Affiche la chaîne brute si le parsing échoue
  }
};

// ─── Badge d'élément animé ────────────────────────────────────────────
// Affiche une animation CSS selon l'élément astrologique du signe.
// Aucun emoji — uniquement des formes CSS animées.
// @param {string} element - "fire" | "water" | "air" | "earth"
// @param {string} label   - Nom FR de l'élément (ex: "Feu")
function ElementBadge({ element, label }) {
  return (
    <div className={`elem-badge elem-${element}`} title={label} aria-label={`Élément : ${label}`}>

      {/* ── FEU : 3 flammes qui vacillent ── */}
      {element === "fire" && (
        <div className="elem-inner">
          <span className="flame" />
          <span className="flame flame--tall" />
          <span className="flame" />
        </div>
      )}

      {/* ── EAU : vagues animées ── */}
      {element === "water" && (
        <div className="elem-inner">
          <div className="water-surface">
            <div className="water-wave" />
          </div>
          <div className="water-drop" />
        </div>
      )}

      {/* ── AIR : lignes de vent qui soufflent ── */}
      {element === "air" && (
        <div className="elem-inner">
          <span className="wind-line" />
          <span className="wind-line wind-line--mid" />
          <span className="wind-line wind-line--short" />
        </div>
      )}

      {/* ── TERRE : particules qui montent ── */}
      {element === "earth" && (
        <div className="elem-inner">
          <div className="earth-core" />
          <span className="earth-particle" style={{ "--i": 0 }} />
          <span className="earth-particle" style={{ "--i": 1 }} />
          <span className="earth-particle" style={{ "--i": 2 }} />
        </div>
      )}

      {/* Label de l'élément */}
      <span className="elem-label">{label}</span>
    </div>
  );
}

// ─── Composant principal ──────────────────────────────────────────────
export default function ResultPanel({ data, sign, onBack, error }) {

  const signInfo = SIGN_DATA[sign] ?? { label: sign, dates: "", element: null, elementLabel: "" };

  // Données horoscope (fallback si null)
  const d = data ?? { date: "—", horoscope: "Aucune donnée. Vérifie ta connexion." };

  // Date formatée en français
  const formattedDate = formatDate(d.date);

  return (
    <div className="result-card">

      {/* ── ① En-tête : retour + date lisible ── */}
      <div className="result-header">
        {/* Bouton retour */}
        <button className="result-back-btn" onClick={onBack} aria-label="Retour à la sélection">
          <span className="result-back-arrow">←</span>
          <span>Retour</span>
        </button>

        {/*
          Date formatée — placée en haut à droite comme un "cachet de lecture"
          Intuitive : l'utilisateur comprend immédiatement "c'est l'horoscope de CE jour"
        */}
        {formattedDate && (
          <div className="result-date-stamp" aria-label={`Horoscope du ${formattedDate}`}>
            <span className="result-date-stamp__dot" aria-hidden="true">✦</span>
            <time className="result-date-stamp__text">{formattedDate}</time>
          </div>
        )}
      </div>

      {/* ── ② Icône avec anneaux animés ── */}
      <div className="result-icon-wrapper">
        <div className="result-ring result-ring--outer" aria-hidden="true" />
        <div className="result-ring result-ring--inner" aria-hidden="true" />
        <div className="result-icon-circle">
          {sign ? (
            <img
              src={`/icons/${sign}.png`}
              alt={`Signe ${signInfo.label}`}
              className="result-icon-img"
              width={72} height={72}
            />
          ) : (
            <span className="result-icon-fallback" aria-hidden="true">🔮</span>
          )}
        </div>
      </div>

      {/* ── ③ Identité du signe ── */}
      <div className="result-identity">
        {/* Nom du signe */}
        <h2 className="result-sign-name">{signInfo.label}</h2>

        {/* Badges : dates de naissance + élément animé */}
        <div className="result-badges">
          <span className="result-badge result-badge--dates">{signInfo.dates}</span>
          {signInfo.element && (
            <ElementBadge element={signInfo.element} label={signInfo.elementLabel} />
          )}
        </div>
      </div>

      {/* ── Séparateur runique ── */}
      <div className="result-divider" aria-hidden="true">
        <span className="divider-line" />
        <span className="divider-gem">✦</span>
        <span className="divider-line" />
      </div>

      {/* ── ④ Erreur API ── */}
      {error && (
        <div className="result-error" role="alert">
          ⚠️ {error.message ?? String(error)}
        </div>
      )}

      {/* ── ⑤ Texte de l'horoscope ── */}
      {!error && (
        <div className="result-horoscope-block">
          <span className="result-quote-mark result-quote-mark--open" aria-hidden="true">"</span>
          <p className="result-horoscope-text">{d.horoscope}</p>
          <span className="result-quote-mark result-quote-mark--close" aria-hidden="true">"</span>
        </div>
      )}

      {/* ── Séparateur bas ── */}
      <div className="result-divider" aria-hidden="true">
        <span className="divider-line" />
        <span className="divider-gem">⋆</span>
        <span className="divider-line" />
      </div>

      {/* ── ⑥ Footer ── */}
      <p className="result-footer" aria-hidden="true">✦ Que les astres vous guident ✦</p>

    </div>
  );
}
