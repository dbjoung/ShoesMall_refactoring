import { useFrame, useLoader, type ThreeEvent } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { CameraControls, ContactShadows } from "@react-three/drei";
import { colorSet } from "@/Constants";

// e.object 타입 못 찾아서 커스텀..
type GLBObjectType = THREE.Object3D<THREE.Object3DEventMap> & {
  material: THREE.MeshStandardMaterial;
};

function ShoesMesh({ color }: { color: string }) {
  const [isTurning /*, setIsTurning*/] = useState(false);
  const [cameraDistance /*, setCameraDistance*/] = useState(2);
  const [cameraHeight /*setCameraHeight*/] = useState(0.8);
  const [cameraDegree, setCameraDegree] = useState(0);

  const selectObjectRef = useRef<GLBObjectType>(null);

  const cameraControlRef = useRef<CameraControls>(null);

  //const objectList = useRef<{ [key: string]: THREE.MeshStandardMaterial }>({});

  const shoesFileObject = useLoader(
    GLTFLoader,
    new URL("../../assets/model/custom.glb", import.meta.url).href,
  );

  const { camera } = useThree();

  useEffect(() => {
    const rightShoes = shoesFileObject.scene.children[1].children;
    const leftShoes = shoesFileObject.scene.children[0].children;

    for (let i = 0; i < rightShoes.length; i++) {
      (rightShoes[i] as GLBObjectType).material.dispose();
      (leftShoes[i] as GLBObjectType).material.dispose();
      (rightShoes[i] as GLBObjectType).material = (rightShoes[i] as GLBObjectType).material.clone();
      (leftShoes[i] as GLBObjectType).material = (leftShoes[i] as GLBObjectType).material.clone();
      //objectList.current[rightShoes[i].name] = (rightShoes[i] as GLBObjectType).material;
      //objectList.current[leftShoes[i].name] = (leftShoes[i] as GLBObjectType).material;
    }
  }, [shoesFileObject]);

  useEffect(() => {
    if (!cameraControlRef.current) return;
    cameraControlRef.current.setPosition(
      cameraDistance * Math.sin(cameraDegree),
      cameraHeight,
      cameraDistance * Math.cos(cameraDegree),
      true,
    );
  }, [cameraDegree, cameraDistance, cameraHeight]);

  useEffect(() => {
    if (selectObjectRef.current)
      selectObjectRef.current.material.color = new THREE.Color(colorSet[color]);
  }, [color]);

  useFrame(() => {
    if (!cameraControlRef.current || !isTurning) return;

    setCameraDegree((prev) => prev + 0.005);

    cameraControlRef.current.setPosition(
      cameraDistance * Math.sin(cameraDegree),
      cameraHeight,
      cameraDistance * Math.cos(cameraDegree),
    );
  });

  const handlerClickShoes = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    selectObjectRef.current = e.object as GLBObjectType;

    selectObjectRef.current.material.emissive.set(new THREE.Color("#B7F2F1"));
    if (cameraControlRef.current) cameraControlRef.current.fitToBox(selectObjectRef.current, true);

    setTimeout(() => {
      if (!selectObjectRef.current) return;
      selectObjectRef.current.material.emissive.set(new THREE.Color("#000"));
    }, 1000);
  };

  return (
    <>
      <directionalLight position={[3, 5, 3]} />
      <pointLight position={[0, 1, 0]} intensity={3} />
      <CameraControls
        ref={cameraControlRef}
        camera={camera}
        dollyToCursor={true}
        minDistance={0.5}
        maxDistance={10}
        onControlEnd={() => {
          //console.log(THREE.MathUtils.radToDeg(Math.asin(camera.position.x / cameraDistance)));
          //setCameraDegree(THREE.MathUtils.radToDeg(Math.asin(camera.position.x / cameraDistance)));
        }}
      />
      <primitive object={shoesFileObject.scene} onPointerUp={handlerClickShoes} />
      <ambientLight />
      <gridHelper args={[10, 10]} /> // 1칸 = 1 단위
      {/* 실린더 지름은 0.8, 중앙 위치 */}
      <mesh position={[0, -0.31, 0]} scale={2}>
        <cylinderGeometry args={[0.4, 0.2, 0.3, 50]} />
        <meshStandardMaterial color='#fff' />
      </mesh>
      <ContactShadows
        position={[0, 0, 0]}
        scale={5}
        color='#000000'
        resolution={512}
        opacity={0.8}
        blur={0.5}
      />
    </>
  );
}

export default ShoesMesh;
