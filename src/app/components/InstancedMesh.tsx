import { useLayoutEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { IObjTable } from "./Scene";

export function InstancedMesh({
  count = 10000,
  radius = 10,
  url,
  size = 0.2,
}: IObjTable) {
  const instancedMeshRef = useRef<THREE.InstancedMesh>(null);
  // const [shapeSwitch, setShapeSwitch] = useState(false);

  // geometry = new THREE.SphereGeometry(0.1, 16, 16),
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);
  const loader = new OBJLoader();
  useMemo(
    () =>
      loader.load(url, (obj) => {
        obj.traverse((child: any) => {
          if (child.isMesh) {
            setGeometry(child.geometry);
          }
        });
      }),
    [url]
  );

  const texLoader = new THREE.TextureLoader();
  // const matcap = texLoader.load("./161B1F_C7E0EC_90A5B3_7B8C9B-512px.png");
  // const matcap = texLoader.load("./3B3C3F_DAD9D5_929290_ABACA8-512px.png");
  const matcap = texLoader.load("./36220C_C6C391_8C844A_8B7B4C-512px.png");
  const startHue = Math.random() * 0.5 + 0.5;
  const color = new THREE.Color().setHSL(startHue + 0 / 10, 1.0, 0.5);
  const material = new THREE.MeshMatcapMaterial({ matcap, color });
  const axis = new THREE.Vector3(0, 0, 1);

  useLayoutEffect(() => {
    if (!geometry) return;
    // Set positions
    for (let i = 0; i < count; i++) {
      const longitude = Math.random() * 2 * Math.PI;
      const latitude = Math.acos(2 * Math.random() - 1);

      const quaternion = new THREE.Quaternion();
      quaternion.setFromAxisAngle(axis, i * (Math.PI / 24));

      const position = new THREE.Vector3(
        // Sphere surface
        radius * Math.sin(latitude) * Math.cos(longitude),
        radius * Math.sin(latitude) * Math.sin(longitude),
        radius * Math.cos(latitude)

        // Stretched poles
        // radius * Math.sin(latitude) * Math.cos(longitude),
        // radius * Math.sin(latitude) * Math.sin(longitude),
        // radius * Math.cos(longitude)
      );
      const scale = new THREE.Vector3().setScalar(size);

      const matrix = new THREE.Matrix4();

      matrix.compose(position, quaternion, scale);
      instancedMeshRef.current?.setMatrixAt(i, matrix);
    }
  }, [geometry]);

  return geometry ? (
    <instancedMesh
      ref={instancedMeshRef}
      args={[geometry, material, count]}
      position={[-4, -4, -8]}
    />
  ) : null;
}
