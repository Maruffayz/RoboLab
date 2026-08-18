import { Float, Grid, MeshReflectorMaterial } from '@react-three/drei';

interface GroundProps {
  size?: number;
}

export const Ground = ({ size = 20 }: GroundProps) => {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, -0.5, 0]}>
        <circleGeometry args={[size, 64]} />
        <MeshReflectorMaterial
          color="#dfeaf7"
          metalness={0.2}
          roughness={0.9}
          blur={[200, 80]}
          resolution={1024}
          mixStrength={12}
          mirror={0.1}
        />
      </mesh>

      <Float speed={1.5} rotationIntensity={0.08} floatIntensity={0.15} position={[0, 0.08, 0]}>
        <Grid
          args={[size, size]}
          cellColor="#93c5fd"
          sectionColor="#60a5fa"
          fadeDistance={25}
          fadeStrength={1}
          cellThickness={0.6}
          sectionThickness={1.1}
          infiniteGrid={false}
          position={[0, 0.01, 0]}
        />
      </Float>
    </group>
  );
};
