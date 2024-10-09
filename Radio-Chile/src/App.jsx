import { useState, useEffect } from "react";
import Radio from "./Radio";
import "./App.css";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const url = "https://api.boostr.cl/radios.json";
    const options = { method: "GET", headers: { accept: "application/json" } };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => setData(json.data))
      .catch((err) => console.error("error:" + err));
  }, []);

  return (
    <main>
      <div>
        <p>Radios Chilenas</p>
      </div>
      <Radio data={data}></Radio>
    </main>
  );
}

export default App;
