//import styled from '@emotion/styled'

import { useState } from "react";
import ColorBar from "./component/ColorBar";
import ShoppingCanvas from "./component/three/ShoppingCanvas";
import AppBar from "@/component/AppBar";

/*
const Button = styled.button`
  padding: 32px;
  background-color: hotpink;
  font-size: 24px;
  border-radius: 4px;
  color: black;
  font-weight: bold;
  &:hover {
    color: white;
  }`
    */

function App() {
  const [color, setColor] = useState("red");
  return (
    <>
      <AppBar />
      <ShoppingCanvas color={color} />
      <ColorBar color={color} setColor={setColor} />
    </>
  );
}

export default App;
