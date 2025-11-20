
export default function ResultPanel({ data, sign, onBack, loading, error }) {

  const d = data ?? {
    description: "Aucune donnée reçue. Vérifie ta connexion ou actualise.",
    date: "—",
    sign: "—",
    horoscope: "—",
  };

  return (

    <div className="card border-light p-3 w-100">
      {/* Header avec signe et bouton retour */}
      <div className="d-flex justify-content-between align-items-start mb-3">
        <div>
          <h3 className="h5 mb-1">{sign ? sign.charAt(0).toUpperCase() + sign.slice(1) : "Horoscope"}</h3>
        </div>
        <button className="btn-cancel p-2" onClick={onBack}>
          ← Retour
        </button>
      </div>

      {/* Loader ou erreur */}
      {error && <div className="alert alert-danger mb-3">Erreur : {error.message ?? String(error)}</div>}

      {/* 5 cartes avec infos */}
      <div className="row g-3">
        <span>📆 <strong>{d.date}</strong></span>
        <div  style={{maxWidth:"450px"}}>🌟{d.horoscope}🌟</div>
      
      </div>
    </div>
  );
}
