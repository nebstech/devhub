import { useAnimations, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import breatherScene from "../assets/3d/breather.glb";
import { animations } from "framer-motion";

const breather = ({ scale, position }) => {
  const breatherRef = useRef();
  const ( scene, animations ) = useGLTF(breatherScene);
  const { actions } = useAnimations(animations, breatherRef);

  useEffect(() => {
    actions["idle"].play();
  }, [actions]);

  return (
    <mesh ref={breatherRef} position={position} scale={scale} rotation={[-0, 3, 0, 3]}>
      <primitive object={scene} />
    </mesh>
  );
};

const breatherCanvas = ({ scrollContainer }) => {
  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(0);
  const [scale, setScale] = useState([2, 2, 2]);
  const [position, setPosition] = useState([0.2, -0.7, 0]); 

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = scrollContainer.current.scrollTop;
      const rotationXValue = scrollTop * -0.0006;
      const rotationYValue = scrollTop * -0.0075;
      setRotationX(rotationXValue);
      setRotationY(rotationYValue);
    }
  }, [scrollContainer]);
};

export default breatherCanvas;