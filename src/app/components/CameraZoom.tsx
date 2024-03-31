import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";

export default function CameraZoom() {
  const { camera } = useThree();

  useFrame(() => {
    camera.position.lerp(new THREE.Vector3(0, 0, 2.5), 0.02);
  });
  return null;
}
