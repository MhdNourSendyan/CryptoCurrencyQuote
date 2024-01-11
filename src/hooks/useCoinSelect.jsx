// Importación de librerías y estilos
import { useState } from "react";
import styled from "@emotion/styled";

// Estilos con Emotion
const Label = styled.label`
  color: #FFF;
  display: block;
  font-family: 'Lato', sans-serif;
  font-size: 24px;
  font-weight: 700;
  margin: 15px 0;
`;

const Select = styled.select`
  width: 100%;
  font-size: 18px;
  padding: 14px;
  border-radius: 10px;
`;

// Hook personalizado para selección de criptomonedas
export default function useCoinSelect({ label, options }) {
  // Estado para almacenar la opción seleccionada
  const [state, setState] = useState("");

  // Componente que utiliza el hook para renderizar el selector de criptomonedas
  const CoinsSelect = () => (
    <div>
      <Label>{label}</Label>
      <Select value={state} onChange={(e) => setState(e.target.value)}>
        <option value="">-- Seleccione --</option>
        {options?.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.name}
          </option>
        ))}
      </Select>
    </div>
  );

  // Devuelve el estado actual y el componente para seleccionar criptomonedas
  return [state, CoinsSelect];
}
