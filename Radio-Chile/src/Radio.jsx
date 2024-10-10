import { useEffect } from 'react';

import './radio.css'
const Radio = ({ data, iterador, volume}) => {
  

 

  const elemento = data[iterador]

  if (!data || data.length === 0) {
    return <p>No hay datos disponibles</p>;
  }


  useEffect(() => {
    const audioElement = document.getElementById("audioElement");
    
    if (audioElement) {

      audioElement.volume = volume

      const playAudio = () => {
        try {
          audioElement.play()
          console.log("Reproducción automática iniciada.");
        } catch (error) {
          console.error("La reproducción automática fue bloqueada:", error)
        }
      };

      playAudio()
    }
  }, [elemento.stream, volume])

  return (
    <section key={elemento.name} >
      <div >
        
        <div className='card__img'>
          <img src={elemento.image[200]} alt="Logo de Radio" />
        </div>
        <div className='card__title'>{elemento.name}</div>
        <div className='card__subtitle'><a href={elemento.url}>{elemento.name}</a></div>
       
        <div className='card__wrapper'>
          <div className="card__time card__time-passed">🟢</div>
          <div className="card__timeline">
            <audio controls id="audioElement" >
              <source src={elemento.stream} type="audio/aac"/>
              Tu navegador no soporta el elemento de audio.
            </audio>
          </div>
          <div className="card__time card__time-left">Live</div>
        </div>
      </div>
    </section>
  );
};

export default Radio;
