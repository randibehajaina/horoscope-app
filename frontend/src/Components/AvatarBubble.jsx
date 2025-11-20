import { useEffect, useState } from "react";




function AvatarBubble() {
    
    const [displayedText, setDisplayedText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);



    const fullText = `Bonjour! Moi, c’est KLO 🌟
Je peux te révéler ton horoscope d’aujourd’hui 👀
Choisis ton signe et découvre ce que les astres ont à te dire`;

    useEffect(() => {
        if (currentIndex < fullText.length) {
            
            const timer = setTimeout(() => {
                setDisplayedText(prev => prev + fullText[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, 20);

            return () => clearTimeout(timer);
        }
    }, [currentIndex, fullText]);

    

    return (

        <>

            <div className='speech-bubble'>
                <strong>{displayedText}</strong>
            </div>
        </>
    )
}


export default AvatarBubble