import styled from "@emotion/styled";

const Texto = styled.div`
  color: #b7322c;
  padding: 15px;
  font-size: 22px;
  text-transform: uppercase;
  font-family: "Lato", sans-serif;
  font-weight: 700;
  text-align: center;
`;

export default function Error({ children }) {
  return <Texto>{children}</Texto>;
}
