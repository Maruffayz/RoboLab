import { useMemo } from 'react';
import type { DifferentialDriveRobotProps } from '../types';

export const DifferentialDriveRobot = ({
  position = [0, 0, 0],
  rotationY = 0,
  scale = 1,
}: DifferentialDriveRobotProps) => {
  const wheelRadius = 0.18 * scale;
  const wheelWidth = 0.12 * scale;
  const robotLength = 1.5 * scale;
  const robotWidth = 1 * scale;
  const robotHeight = 0.45 * scale;

  const wheelPositions = useMemo(
    () => [
      [-robotWidth / 2, -0.16 * scale, 0.5 * scale],
      [robotWidth / 2, -0.16 * scale, 0.5 * scale],
      [-robotWidth / 2, -0.16 * scale, -0.5 * scale],
      [robotWidth / 2, -0.16 * scale, -0.5 * scale],
    ],
    [robotWidth, scale],
  );

  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      <mesh castShadow position={[0, 0.22, 0]}>
        <boxGeometry args={[robotLength, robotHeight, robotWidth]} />
        <meshStandardMaterial color="#2563eb" metalness={0.5} roughness={0.4} />
      </mesh>

      <mesh castShadow position={[0, 0.55, 0]}>
        <boxGeometry args={[0.7, 0.3, 0.5]} />
        <meshStandardMaterial color="#1d4ed8" metalness={0.45} roughness={0.35} />
      </mesh>

      {wheelPositions.map((wheelPosition, index) => (
        <group key={index} position={wheelPosition as [number, number, number]}>
          <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[wheelRadius, wheelRadius, wheelWidth, 24]} />
            <meshStandardMaterial color="#111827" roughness={0.85} metalness={0.15} />
          </mesh>
        </group>
      ))}
    </group>
  );
};
