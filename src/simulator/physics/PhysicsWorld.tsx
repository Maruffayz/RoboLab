import { Physics, RigidBody, CuboidCollider, RapierRigidBody } from '@react-three/rapier';
import type { ReactNode } from 'react';

interface PhysicsWorldProps {
  children: ReactNode;
}

export const PhysicsWorld = ({ children }: PhysicsWorldProps) => {
  return (
    <Physics gravity={[0, -9.81, 0]} timeStep={1 / 60} debug={false}>
      {children}
    </Physics>
  );
};

export const PhysicsFloor = () => (
  <RigidBody type="fixed" colliders={false} position={[0, -0.5, 0]}>
    <CuboidCollider args={[20, 0.5, 20]} friction={1.2} restitution={0.05} />
  </RigidBody>
);

export const RobotRigidBody = ({
  children,
  bodyRef,
}: {
  children: ReactNode;
  bodyRef: React.RefObject<RapierRigidBody | null>;
}) => (
  <RigidBody
    ref={bodyRef}
    colliders={false}
    friction={1.4}
    restitution={0.08}
    linearDamping={1.3}
    angularDamping={2.5}
    position={[0, 0.8, 0]}
  >
    <CuboidCollider args={[0.9, 0.35, 0.7]} friction={1.5} restitution={0.05} />
    {children}
  </RigidBody>
);
