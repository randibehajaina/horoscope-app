// src/components/SignScroller.jsx
import { useContext } from "react";
import { HoroscopContext } from "../context/HoroscopContext";


const SIGNS = [
  { key: "aries", label: "Bélier" },
  { key: "taurus", label: "Taureau" },
  { key: "gemini", label: "Gémeaux" },
  { key: "cancer", label: "Cancer" },
  { key: "leo", label: "Lion" },
  { key: "virgo", label: "Vierge" },
  { key: "libra", label: "Balance" },
  { key: "scorpio", label: "Scorpion" },
  { key: "sagittarius", label: "Sagittaire" },
  { key: "capricorn", label: "Capricorne" },
  { key: "aquarius", label: "Verseau" },
  { key: "pisces", label: "Poissons" },
];

export default function SignScroller() {

  const { selectedSign , setSelectedSign } = useContext(HoroscopContext);

  const handleChoose = (signKey) => {
    setSelectedSign(signKey);
    // if (typeof onSelect === "function") onSelect(signKey);
  };

  return (
    
    <div className="w-100">
      {/* Wrapper vertical : hauteur limitée + scroll-y */}

      <div
        className="d-flex flex-column gap-2 overflow-auto p-2 custom-scroll"
        style={{ maxHeight: 420}}
      >


        {SIGNS.map((s) => {
          const isActive = selectedSign === s.key;
          const btnClass = isActive
            ? "btn btn-primary d-flex align-items-center gap-2 shadow-sm"
            : "btn btn-outline-light d-flex align-items-center gap-2";

          return (
            <button
              key={s.key}
              onClick={() => handleChoose(s.key)}
              className={btnClass}
              style={{
                width: "100%",        // prend toute la largeur du conteneur
                minHeight: 56,        // hauteur confort pour le toucher (mobile)
                justifyContent: "flex-start", // icône à gauche + texte après
                whiteSpace: "nowrap",
              }}
            >
              <img
                src={`/icons/${s.key}.png`}
                alt={`${s.label} icône`}
                className="rounded-circle bg-light p-1"
                width={40}
                height={40}
                loading="lazy"
                style={isActive ? { boxShadow: "0 6px 18px rgba(0,0,0,0.35)" } : {}}
              />
              <span className="fw-medium">{s.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
