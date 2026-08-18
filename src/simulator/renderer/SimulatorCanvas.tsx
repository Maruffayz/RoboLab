import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { CuboidCollider, RigidBody, type RapierRigidBody } from '@react-three/rapier';
import { useRef } from 'react';
import { Ground } from '../environment/Ground';
import { EnvironmentObstacles } from '../environment/Obstacles';
import { PhysicsFloor, PhysicsWorld } from '../physics/PhysicsWorld';
import { DifferentialDriveRobot } from '../robots/DifferentialDriveRobot';
import { useSimulatorStore } from '../store';

const RobotRig = () => {
  const bodyRef = useRef<RapierRigidBody>(null);
  const robot = useSimulatorStore((state) => state.robot);

  useFrame((_, delta) => {
    const store = useSimulatorStore.getState();
    store.tick(delta);

    const nextRobot = useSimulatorStore.getState().robot;
    if (!bodyRef.current) return;

    const forwardSpeed = ((nextRobot.leftMotorSpeed + nextRobot.rightMotorSpeed) / 2) * 1.5;
    const turnSpeed = (nextRobot.rightMotorSpeed - nextRobot.leftMotorSpeed) * 0.5;

    const targetVelocity = {
      x: Math.sin(nextRobot.rotation) * forwardSpeed,
      y: 0,
      z: Math.cos(nextRobot.rotation) * forwardSpeed,
    };

    bodyRef.current.setLinvel(targetVelocity, true);
    bodyRef.current.setAngvel({ x: 0, y: turnSpeed, z: 0 }, true);

    const translation = bodyRef.current.translation();
    const rotation = bodyRef.current.rotation();
    const yaw = Math.atan2(
      2 * (rotation.w * rotation.y + rotation.x * rotation.z),
      1 - 2 * (rotation.y * rotation.y + rotation.z * rotation.z),
    );

    useSimulatorStore.setState((state) => ({
      robot: {
        ...state.robot,
        position: [translation.x, translation.y, translation.z],
        rotation: yaw,
        velocity: Math.hypot(targetVelocity.x, targetVelocity.z),
      },
    }));
  });

  return (
    <RigidBody
      ref={bodyRef}
      colliders={false}
      position={robot.position}
      rotation={[0, robot.rotation, 0]}
      friction={1.4}
      restitution={0.08}
      linearDamping={1.3}
      angularDamping={2.5}
    >
      <CuboidCollider args={[0.9, 0.35, 0.7]} friction={1.5} restitution={0.05} />
      <DifferentialDriveRobot position={[0, 0, 0]} rotationY={0} scale={1.2} />
    </RigidBody>
  );
};

export const SimulatorCanvas = () => {
  return (
    <div className="h-[520px] w-full overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-xl dark:border-slate-800 dark:bg-slate-900">
      <Canvas shadows dpr={[1, 2]}>
        <color attach="background" args={['#e2e8f0']} />

        <PerspectiveCamera makeDefault position={[4, 5, 8]} fov={42} />
        <ambientLight intensity={1.15} />
        <directionalLight castShadow position={[5, 8, 6]} intensity={1.8} shadow-mapSize={[2048, 2048]} />
        <spotLight position={[-6, 7, 6]} angle={0.45} intensity={1.3} penumbra={0.8} color="#bfdbfe" />

        <PhysicsWorld>
          <Ground size={18} />
          <PhysicsFloor />
          <EnvironmentObstacles />
          <RobotRig />
        </PhysicsWorld>

        <OrbitControls enablePan enableZoom enableRotate maxPolarAngle={Math.PI / 2.2} minDistance={4} maxDistance={16} />
      </Canvas>
    </div>
  );
};
