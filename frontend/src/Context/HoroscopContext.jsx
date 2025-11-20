import { createContext, useState } from "react";
import axios from 'axios';
export const HoroscopContext = createContext()

export const HoroscopProvider = ({ children }) => {

    const [selectedSign, setSelectedSign] = useState('aries') 
    const [day, setDay] = useState('today')
    const [horoscop, setHoroscop] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchHoroscop = async (sign) => {

        try {
            
             const response = await axios.get(`http://localhost:5000/horoscope/${sign}`);
             return response.data;

        } catch (err) {

            console.error("Erreur API:", err.message);
            throw err; 
        }
    }

    return (

        <HoroscopContext.Provider

            value={{

                selectedSign,
                setSelectedSign,
                day,
                setDay,
                horoscop,
                setHoroscop,
                loading,
                setLoading,
                error,
                setError,
                fetchHoroscop
            }}
        >
            {children}
        </HoroscopContext.Provider>
    )
}