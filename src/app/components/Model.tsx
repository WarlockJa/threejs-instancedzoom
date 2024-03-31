import * as THREE from "three";
import { useMemo, useState } from "react";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";

export function Model({ url }: { url: string }) {
  const [obj, set] = useState<THREE.Group>();
  useMemo(() => new OBJLoader().load(url, set), [url]);

  return obj ? <primitive object={obj} /> : null;
}
