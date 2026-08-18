import type { RapierRigidBody } from '@react-three/rapier';
import { useSimulatorStore } from '../store';

export const applyMovementToBody = (
  body: RapierRigidBody | null,
  dt: number,
) => {
  if (!body) return;

  const state = useSimulatorStore.getState();
  const { robot } = state;

  const moveForce = robot.leftMotorSpeed + robot.rightMotorSpeed;
  const turnForce = robot.rightMotorSpeed - robot.leftMotorSpeed;

  body.applyImpulse(
    {
      x: Math.sin(robot.rotation) * ((moveForce / 2) * 0.9) * dt,
      y: 0,
      z: Math.cos(robot.rotation) * ((moveForce / 2) * 0.9) * dt,
    },
    true,
  );

  body.applyTorqueImpulse({ x: 0, y: turnForce * 0.25 * dt, z: 0 }, true);
};
