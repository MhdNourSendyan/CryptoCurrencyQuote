// Importación de librerías y estilos
import { useState, useEffect } from "react";
import styled from "@emotion/styled";

// Importación de componentes y hooks
import Error from "./Error.jsx";
import useCoinSelect from "../hooks/useCoinSelect.jsx";
import { Coins } from "../data/Coins.js";

// Estilos con Emotion
const InputSubmit = styled.input`
  background-color: #9497ff;
  border: none;
  width: 100%;
  padding: 10px;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  margin-top: 30px;
  &:hover {
    background-color: #7a7dfe;
    cursor: pointer;
  }
`;

// Componente de formulario
export default function Form({ setCoins }) {
    // Estados del componente
    const [cryptos, setCryptos] = useState([]);
    const [error, setError] = useState(false);
    const [coin, CoinsSelect] = useCoinSelect({ label: "Elige tu Moneda", options: Coins });
    const [crypto, SelectCrypto] = useCoinSelect({ label: "Elige tu Criptomoneda", options: cryptos });

    // Efecto secundario para obtener las criptomonedas disponibles
    useEffect(() => {
        const consultAPI = async () => {
            const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=25&tsym=USD";
            const response = await fetch(url);
            const result = await response.json();
            const cryptoArray = result.Data.map((crypto) => ({
                id: crypto.CoinInfo.Name,
                name: crypto.CoinInfo.FullName,
            }));
            setCryptos(cryptoArray);
        };
        consultAPI();
    }, []);

    // Manejador de envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        if ([coin, crypto].includes('')) {
            setError(true);
            return;
        }
        setError(false);
        setCoins({
            coin,
            crypto,
        });
    };

    // Renderizado del componente de formulario
    return (
        <>
            {error && <Error>Todos los campos son obligatorios</Error>}
            <form onSubmit={handleSubmit}>
                <CoinsSelect />
                <SelectCrypto />
                <InputSubmit type="submit" value="Cotizar" />
            </form>
        </>
    );
}
