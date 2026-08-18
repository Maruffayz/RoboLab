import { RigidBody, CuboidCollider } from '@react-three/rapier';

interface ObstacleProps {
  position: [number, number, number];
  size: [number, number, number];
}

export const Obstacle = ({ position, size }: ObstacleProps) => (
  <RigidBody type="fixed" position={position} colliders={false}>
    <CuboidCollider args={size} friction={1.2} restitution={0.1} />
    <mesh castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color="#64748b" roughness={0.8} metalness={0.15} />
    </mesh>
  </RigidBody>
);

export const EnvironmentObstacles = () => (
  <>
    <Obstacle position={[0, 0.75, -4.5]} size={[4, 1.5, 0.6]} />
    <Obstacle position={[-4.5, 0.75, 0]} size={[0.6, 1.5, 4]} />
    <Obstacle position={[4.5, 0.75, 2]} size={[0.6, 1.5, 5]} />
    <Obstacle position={[0, 0.75, 4.5]} size={[4.5, 1.5, 0.6]} />
  </>
);
