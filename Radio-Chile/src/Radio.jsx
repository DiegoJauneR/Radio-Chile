import { useEffect } from 'react';

const Radio = ({ data, iterador}) => {
  const elemento = data[iterador]

  if (!data || data.length === 0) {
    return <p>No hay datos disponibles</p>;
  }

  useEffect(() => {
    const audioElement = document.getElementById("audioElement");
    
    if (audioElement) {
      const playAudio = async () => {
        try {
          await audioElement.play()
          console.log("Reproducción automática iniciada.");
        } catch (error) {
          console.error("La reproducción automática fue bloqueada:", error)
        }
      };

      playAudio()
    }
  }, [elemento.stream])

  return (
    <section key={elemento.name}>
      <div>
        <div>
          <img src={elemento.image[200]} alt="Logo de Radio" />
        </div>
        <a href={elemento.url}>{elemento.name}</a>
        <div>
          <audio controls id="audioElement" volume="0.7">
            <source src={elemento.stream} type="audio/aac"/>
            Tu navegador no soporta el elemento de audio.
          </audio>
        </div>
      </div>
    </section>
  );
};

export default Radio;
