/* eslint-disable react/prop-types */
import { useEffect } from "react";

import "./radio.css";
const Radio = ({ data, iterador, volume, isPlaying }) => {
  const elemento = data[iterador];

  if (!data || data.length === 0) {
    return <p>No hay datos disponibles</p>;
  }

  useEffect(() => {
    const audioElement = document.getElementById("audioElement");

    if (audioElement) {
      audioElement.volume = volume;

      const playAudio = async () => {
        try {
          await audioElement.play();
          console.log("Reproducción automática iniciada.");
        } catch (error) {
          console.error("La reproducción automática fue bloqueada:", error);
        }
      };

      playAudio();
    }
  }, [elemento.stream, volume]);

  return (
    <section key={elemento.name}>
      <div>
        <div className="card__img">
          <img src={elemento.image[200]} alt="Logo de Radio" />
        </div>
        <div className="card__title">{elemento.name}</div>
        <div className="card__subtitle">
          <a href={elemento.url} target="_blank">
            {elemento.name}
          </a>
        </div>

        <div className="tapadonCourtois">
          <div
            className="loading"
            style={{ visibility: isPlaying ? "visible" : "hidden" }}
          >
            <div className="load"></div>
            <div className="load"></div>
            <div className="load"></div>
            <div className="load"></div>
          </div>
        </div>

        <div className="card__wrapper">
          <div className="card__time card__time-passed">🟢</div>
          <div className="card__timeline">
            <audio controls id="audioElement">
              <source src={elemento.stream} type="audio/aac" />
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
