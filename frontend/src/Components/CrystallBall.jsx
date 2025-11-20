import React, { useState, useEffect } from 'react';
import '../CrystalBall.css';

export default function CrystalBall() {
  const [stars, setStars] = useState([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const newStars = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.4 + 0.2,
      delay: Math.random() * 3
    }));
    setStars(newStars);
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setMousePos({ x, y });
  };

  return (
    <div className="crystal-ball-container">
      <div className="crystal-ball-wrapper">
        <div 
          className="crystal-ball-animated"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
        >
          <div 
            className="crystal-ball"
            style={{
              transform: `perspective(1000px) rotateX(${mousePos.y}deg) rotateY(${mousePos.x}deg)`
            }}
          >
            <div className="crystal-ball-background"></div>
            <div className="crystal-ball-shine"></div>
            <div className="crystal-ball-highlight"></div>
            
            <div className="crystal-ball-stars">
              {stars.map((star) => (
                <div
                  key={star.id}
                  className="crystal-ball-star"
                  style={{
                    left: `${star.x}%`,
                    top: `${star.y}%`,
                    width: `${star.size}px`,
                    height: `${star.size}px`,
                    opacity: star.opacity,
                    animationDelay: `${star.delay}s`,
                    boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.5)`
                  }}
                />
              ))}
              
              <svg className="crystal-ball-constellations">
                <line x1="20%" y1="30%" x2="35%" y2="45%" stroke="white" strokeWidth="0.5" />
                <line x1="35%" y1="45%" x2="50%" y2="40%" stroke="white" strokeWidth="0.5" />
                <line x1="50%" y1="40%" x2="65%" y2="55%" stroke="white" strokeWidth="0.5" />
                <line x1="60%" y1="25%" x2="70%" y2="35%" stroke="white" strokeWidth="0.5" />
                <line x1="70%" y1="35%" x2="75%" y2="50%" stroke="white" strokeWidth="0.5" />
                <line x1="30%" y1="70%" x2="45%" y2="75%" stroke="white" strokeWidth="0.5" />
                <line x1="45%" y1="75%" x2="55%" y2="80%" stroke="white" strokeWidth="0.5" />
              </svg>
            </div>
            
            <div className="crystal-ball-mist">
              <div className="crystal-ball-mist1"></div>
              <div className="crystal-ball-mist2"></div>
            </div>
            
            <div className="crystal-ball-border"></div>
          </div>
          
          <div className="crystal-ball-shadow"></div>
        </div>
        
        <div className="crystal-ball-stand">
          <div className="crystal-ball-stand-base"></div>
          <div className="crystal-ball-stand-top"></div>
        </div>
      </div>
    </div>
  );
}