"use client";
import { CameraShake, Cloud, OrbitControls, Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import CameraZoom from "./CameraZoom";
import { InstancedMesh } from "./InstancedMesh";

export interface IObjTable {
  url: string;
  radius?: number;
  count?: number;
  size?: number;
}

const objsTable: IObjTable[] = [
  {
    url: "A_12.obj",
    count: 2000,
  },
  {
    url: "B_01.obj",
    count: 2000,
  },
  {
    url: "B_10.obj",
    count: 2000,
  },
  {
    url: "D_08.obj",
    count: 3000,
  },
  {
    url: "D_16.obj",
    count: 500,
  },
  {
    url: "goldfish3.obj",
    count: 2000,
  },
  {
    url: "H_07.obj",
    count: 1000,
  },
  {
    url: "skull2.obj",
    count: 1000,
  },
];

export default function Scene() {
  const objProps =
    objsTable[Math.floor(Math.random() * (objsTable.length - 1))];
  return (
    <Canvas camera={{ position: [0, 0, 5000] }}>
      <OrbitControls />
      <Stars factor={4} saturation={0} fade speed={1} />
      <pointLight position={[0, 0, 15]} intensity={200} />
      <CameraZoom />
      <CameraShake />
      <Cloud position={[0, 0, 0]} />
      <InstancedMesh {...objProps} />
    </Canvas>
  );
}
