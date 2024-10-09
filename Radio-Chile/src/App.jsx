import { useState, useEffect } from "react";
import Radio from "./Radio";
import "./App.css";
import "./radio.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForward, faPlay, faBackward} from '@fortawesome/free-solid-svg-icons';

function App() {
  const [data, setData] = useState([]);
  const [iterador, setIterador] = useState(0)
  const [busqueda, setBusqueda] = useState()
  const [radiosFiltradas, setRadiosFiltradas] = useState([])
  const [isPlaying, setIsPlaying] = useState(true)
  const [volume, setVolume] = useState(0.5)



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
      setIterador(0)
      return
    }
    console.log(data.length)
    setIterador(iterador+1)
  }

  const anteriorRadio = () => {
    if(iterador === 0) {
      setIterador(data.length-1)
      return
    }
    setIterador(iterador-1)
  }

  const buscarRadio = () =>{
    const iterador2 = (elemento) => elemento.name === busqueda
    const iteradorBuscado = data.findIndex(iterador2)
    if(iteradorBuscado===-1) return
    setIterador(iteradorBuscado) 
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
        <p>Radios Chilenas</p>
      </div>
      <input type="search" placeholder="Buscar Radio" value={busqueda} onChange={filtrarBusqueda}></input>
      <button onClick={buscarRadio}>Buscar</button>
      {busqueda && (
        <ul>
          {radiosFiltradas.map((radio, index) => (
            <li key={index}>
              <button onClick={()=>rellenarBusqueda(radio.name)}>{radio.name}</button>
            </li>
          ))}
        </ul>
      )}
      <div className='card'>
        <Radio data={data} iterador={iterador} volume={volume}></Radio>
        <div className="card__wrapper">
            <button className="card__btn btnAnterior" onClick={anteriorRadio}><FontAwesomeIcon icon={faBackward} style={{ color: "#ffffff" }} /></button>
            <button className="card__btn card__btn-play " onClick={togglePlayPause}>
             <FontAwesomeIcon icon={faPlay} style={{ color: "#ffffff" }} />
            </button>
            <button className="card__btn btnSiguiente" onClick={siguienteRadio}><FontAwesomeIcon icon={faForward} style={{ color: "#ffffff" }}></FontAwesomeIcon></button>
        </div>
      </div>
      
    </main>
  );
}

export default App;
