import { useState, useEffect } from "react";
import Radio from "./Radio";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [iterador, setIterador] = useState(0)
  const [busqueda, setBusqueda] = useState()
  const [radiosFiltradas, setRadiosFiltradas] = useState([])

  useEffect(() => {
    const url = "https://api.boostr.cl/radios.json";
    const options = { method: "GET", headers: { accept: "application/json" } };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => setData(json.data))
      .catch((err) => console.error("error:" + err));
  }, []);

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

  return (
    <main>
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
      <Radio data={data} iterador={iterador}></Radio>
      <button onClick={anteriorRadio}>atras</button>
      <button onClick={siguienteRadio}>siguiente</button>
    </main>
  );
}

export default App;
