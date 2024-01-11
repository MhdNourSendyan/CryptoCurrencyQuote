// Importación de librerías y estilos
import { useState, useEffect } from "react";
import styled from "@emotion/styled";

// Importación de componentes
import Form from "./components/Form";
import Result from "./components/Result";
import Spinner from "./components/Spinner";

// Importación de imagen
import CryptoImage from "./assets/img/Crypto.png";

// Estilos con Emotion
const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`;

const Heading = styled.h1`
  font-family: "Lato", sans-serif;
  color: #fff;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after {
    content: "";
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
    margin: 10px auto 0 auto;
  }
`;

// Componente principal
export default function App() {
  // Estados del componente
  const [coins, setCoins] = useState({});
  const [result, setResult] = useState({});
  const [loading, setLoading] = useState(false);

  // Efecto secundario para obtener la cotización de criptomonedas
  useEffect(() => {
    if (Object.keys(coins).length > 0) {
      const cryptoRate = async () => {
        setLoading(true);
        setResult({});
        const { coin, crypto } = coins;
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${crypto}&tsyms=${coin}`;
        const response = await fetch(url);
        const result = await response.json();
        setResult(result.DISPLAY[crypto][coin]);
        setLoading(false);
      };
      cryptoRate();
    }
  }, [coins]);

  // Renderizado del componente
  return (
    <Contenedor>
      <Imagen src={CryptoImage} alt="imágenes criptomonedas" />

      <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>
        <Form setCoins={setCoins} />
        {loading && <Spinner />}
        {result.PRICE && <Result result={result} />}
      </div>
    </Contenedor>
  );
}
