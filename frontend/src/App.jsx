import { useContext, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

import './App.css'
import SignScroller from './Components/SignScroller'
import { HoroscopProvider, HoroscopContext } from './Context/HoroscopContext'
import AvatarBubble from './Components/AvatarBubble'
import ResultPanel from './Components/ResultPanel'
import CrystalBall from './Components/CrystallBall'

function InnerApp() {

  const [showResults, setShowResults] = useState(false)

  // Recuperation de tous les contexts

  const {
    selectedSign,
    day,
    horoscop,
    setHoroscop,
    loading,
    setLoading,
    error,
    setError,
    fetchHoroscop
  } = useContext(HoroscopContext)

  const ViewHoroscop = async () => {


    setLoading(true)
    setError(false)

    try {

      let data = null

      if (typeof (fetchHoroscop) === "function") {

        data = await fetchHoroscop(selectedSign)

      }

      if (!data) {

        data = {
          description: "Aperçu local : l'API n'est pas encore connectée.",
          date: "???",
          sign: "???",
          horoscope: "Balance",
        }
      }

      setHoroscop(data);     // stocke les données dans le contexte
      setShowResults(true);  // bascule sur la cartes


    } catch (error) {

      setError(error);
      setShowResults(true);

    } finally {

      setLoading(false);     // stop loader

    }

  }

  const handleBack = () => setShowResults(false); // bouton retour

  return (

    <div className="container min-vh-100 d-flex m-0" style={{ position: "relative" }}>

      <div className="row w-100 justify-content-center align-items-center">

        {/* Col de gauche : avatar + bubble */}
        <div className="col-12 col-md-4 d-flex flex-column align-items-center mb-4 mb-md-0">
          <img src="/avatar-horoscope.png" alt="Avatar" className=" avatar" />
          <AvatarBubble />
        </div>

        {/* Col de droite : sélecteur ou résultats */}
        <div className="col-12 col-md-6">
          {


            loading ? (

              <CrystalBall />
            ) : !showResults ? (
              <div className="card bg-transparent border-light p-3" style={{ borderRadius: "17px" }}>
                <SignScroller />
                <button
                  className="btn-card mt-3 w-100"
                  onClick={ViewHoroscop}
                  disabled={loading}
                >
                  {loading ? "Chargement..." : "Voir mon horoscope"}
                </button>
              </div>
            ) : (
              <ResultPanel

                data={horoscop}
                sign={selectedSign}
                loading={loading}
                error={error}
                onBack={handleBack}

              />
            )}
        </div>

      </div>
    </div>

  )

}

function App() {

  return (

    <HoroscopProvider>
      <InnerApp />
    </HoroscopProvider>
  )
}

export default App
