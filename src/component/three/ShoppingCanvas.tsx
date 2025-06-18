import { Canvas } from "@react-three/fiber";
import { css } from "@emotion/react";
import ShoesMesh from "./ShoesMesh";
import { OrbitControls } from "@react-three/drei";

function ShoppingCanvas({ color }: { color: string }) {
  return (
    <Canvas
      css={css({
        width: "100%",
        height: "100%",
      })}
    >
      <OrbitControls />
      <axesHelper />
      <gridHelper args={[10, 10]} />

      <ambientLight />
      <directionalLight />
      <ShoesMesh color={color} />
    </Canvas>
  );
}

export default ShoppingCanvas;
