export type Vec3Tuple = [number, number, number];

export interface RobotState {
  position: Vec3Tuple;
  rotationY: number;
  leftWheelRotation: number;
  rightWheelRotation: number;
}

export interface DifferentialDriveRobotProps {
  position?: Vec3Tuple;
  rotationY?: number;
  scale?: number;
}

export interface EnvironmentSettings {
  groundSize?: number;
  gridSize?: number;
  accentColor?: string;
}
