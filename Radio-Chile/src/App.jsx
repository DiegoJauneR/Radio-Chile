import { useState, useEffect } from "react";
import Radio from "./Radio";
import "./App.css";
import "./radio.css";
import 'animate.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForward, faPlay, faBackward, faPause} from '@fortawesome/free-solid-svg-icons';

function App() {
  const [data, setData] = useState([]);
  const [iterador, setIterador] = useState(1)
  const [busqueda, setBusqueda] = useState()
  const [radiosFiltradas, setRadiosFiltradas] = useState([])
  const [isPlaying, setIsPlaying] = useState(true)
  const [volume, setVolume] = useState(1)
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const url = "https://api.boostr.cl/radios.json";
    const options = { method: "GET", headers: { accept: "application/json" } };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => setData(json.data))
      .catch((err) => console.error("error:" + err));
  }, []);

  useEffect(() => {
    const audioElement = document.getElementById("audioElement")

    if (audioElement) {
      audioElement.volume = volume

      const updateVolume = () => {
        setVolume(audioElement.volume)
      };

      audioElement.addEventListener("volumechange", updateVolume)

      return () => {
        audioElement.removeEventListener("volumechange", updateVolume)
      }
    }
  }, [iterador, volume])

  const siguienteRadio = () => {
    if(iterador === data.length-1) {
      setIsPlaying(true)
      setIterador(0)
      return
    }
    setIsPlaying(true)
    console.log(data.length)
    setIterador(iterador+1)
  }

  const anteriorRadio = () => {
    if(iterador === 0) {
      setIterador(data.length-1)
      setIsPlaying(true)
      return
    }
    setIsPlaying(true)
    setIterador(iterador-1)
  }

  const buscarRadio = () =>{
    const iterador2 = (elemento) => elemento.name === busqueda
    const iteradorBuscado = data.findIndex(iterador2)
    if(iteradorBuscado===-1) return
    setIterador(iteradorBuscado) 
    setIsPlaying(true)
  }

  const filtrarBusqueda = (event) => {
    const value = event.target.value
    setBusqueda(value)

    
    const resultadosFiltrados = data.filter((radio) =>
      radio.name.toLowerCase().includes(value.toLowerCase())
    );
    setRadiosFiltradas(resultadosFiltrados)
  };

  const rellenarBusqueda = (nombreRadio) =>{
    setBusqueda(nombreRadio)
    setRadiosFiltradas([])
  }

  const handleClick = () => {
    setIsFadingOut(true);
    setIterador(0)
    setIsVisible(true)
  };
  const handleAnimationEnd = () => {
    setIsHidden(true);
  };

  const togglePlayPause = () => {
    const audioElement = document.getElementById("audioElement")

    if (isPlaying) {
      audioElement.pause()
    } else {
      audioElement.play()
    }

    setIsPlaying(!isPlaying)
  }

  return (
    <main >
      <div>
        <img src="https://res.cloudinary.com/doq82xcpd/image/upload/v1728602094/titulo_ekqc6e.webp" alt=""  className="imgTitulo"/>
      </div>
    
      <div className="containerBusqueda" style={{ visibility: isVisible ? 'visible' : 'hidden' }}>
        
        <div className="input-group">
          <input required=" " type="text" name="text"  className="input" value={busqueda} onChange={filtrarBusqueda} />
          <label className="user-label">Buscar Radio</label>
        </div>


        <button className="btnBuscar" onClick={buscarRadio}>Buscar</button>
        
      </div>
      {busqueda && (
          <div className="listaRadios">
            {radiosFiltradas.map((radio, index) => (
              <div key={index}>
                <button onClick={()=>rellenarBusqueda(radio.name)}>{radio.name}</button>
              </div>
            ))}
          </div>
        )}
      <div className='card'>
        {!isHidden &&(
          <div className={`containerInicioRadio ${isFadingOut ? 'animate__animated animate__fadeOut' : ''}`}
          onAnimationEnd={handleAnimationEnd} >
          <img src="https://res.cloudinary.com/doq82xcpd/image/upload/v1728602103/fondoBloqueo_o5scov.webp" alt="Fondo Card" className="imagenBloqueo" />
          <button className="btnIniciarRadio" onClick={handleClick}>Iniciar</button>
          </div>
        )}
        <Radio data={data} iterador={iterador} volume={volume} isPlaying={isPlaying}></Radio>
        <div className="card__wrapper">
            <button className="card__btn btnAnterior" onClick={anteriorRadio}><FontAwesomeIcon icon={faBackward} style={{ color: "#ffffff" }} /></button>
            <button className="card__btn card__btn-play " onClick={togglePlayPause}>
            {isPlaying ? <FontAwesomeIcon icon={faPause} style={{ color: "#ffffff" }} /> : <FontAwesomeIcon icon={faPlay} style={{ color: "#ffffff" }} />}
            </button>
            <button className="card__btn btnSiguiente" onClick={siguienteRadio}><FontAwesomeIcon icon={faForward} style={{ color: "#ffffff" }}></FontAwesomeIcon></button>
        </div>
      </div>
    </main>
  );
}

export default App;
