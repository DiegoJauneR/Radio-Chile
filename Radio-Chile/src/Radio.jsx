const Radio = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No hay datos disponibles</p>;
  }

  const elemento = data[0];

  return (
    <section key={elemento.name}>
      <div>
        <div>
          <p>{elemento.name}</p>
          <p>{elemento.url}</p>
          <audio controls>
            <source src={elemento.stream} type="audio/aac" />
            Tu navegador no soporta el elemento de audio.
          </audio>
        </div>
        <div>
          <img src={elemento.image[200]} alt="Logo de Radio" />
        </div>
      </div>
    </section>
  );
};

export default Radio;
