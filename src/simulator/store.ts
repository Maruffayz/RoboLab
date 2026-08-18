import { create } from 'zustand';
import { DifferentialDriveRobotAPI, DifferentialDriveSimulationEngine, type RobotStatus } from './robots/robotApi';

export type { RobotStatus };

export interface SimulatorRobotState {
  position: [number, number, number];
  rotation: number;
  velocity: number;
  leftMotorSpeed: number;
  rightMotorSpeed: number;
  status: RobotStatus;
}

interface SimulatorState {
  keys: Record<string, boolean>;
  robot: SimulatorRobotState;
  tick: (dt: number) => void;
  setKey: (key: string, pressed: boolean) => void;
  setRobot: (robot: Partial<SimulatorRobotState>) => void;
  reset: () => void;
}

const initialRobotState: SimulatorRobotState = {
  position: [0, 0.4, 0],
  rotation: 0,
  velocity: 0,
  leftMotorSpeed: 0,
  rightMotorSpeed: 0,
  status: 'idle',
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const robotApi = new DifferentialDriveRobotAPI();
const robotEngine = new DifferentialDriveSimulationEngine(robotApi);

export const useSimulatorStore = create<SimulatorState>((set, get) => ({
  keys: { w: false, a: false, s: false, d: false, ' ': false },
  robot: initialRobotState,
  tick: (dt) => {
    const pressed = get().keys;
    const motorState = robotEngine.updateFromInput(pressed, dt);

    const targetVelocity = ((motorState.leftMotorSpeed + motorState.rightMotorSpeed) / 2) * 0.8;
    const targetRotation = ((motorState.rightMotorSpeed - motorState.leftMotorSpeed) * dt * 0.9);

    set((state) => {
      const current = state.robot;
      const nextRotation = current.rotation + targetRotation;
      const nextVelocity = current.velocity + (targetVelocity - current.velocity) * 0.18;
      const forwardX = Math.sin(nextRotation) * nextVelocity * dt;
      const forwardZ = Math.cos(nextRotation) * nextVelocity * dt;
      const updatedX = current.position[0] + forwardX;
      const updatedZ = current.position[2] + forwardZ;

      return {
        robot: {
          ...current,
          position: [clamp(updatedX, -8, 8), 0.4, clamp(updatedZ, -8, 8)],
          rotation: nextRotation,
          velocity: clamp(nextVelocity, -2.8, 2.8),
          leftMotorSpeed: clamp(motorState.leftMotorSpeed, -3, 3),
          rightMotorSpeed: clamp(motorState.rightMotorSpeed, -3, 3),
          status: motorState.status,
        },
      };
    });
  },
  setKey: (key, pressed) =>
    set((state) => ({
      keys: {
        ...state.keys,
        [key.toLowerCase()]: pressed,
      },
    })),
  setRobot: (robot) =>
    set((state) => ({
      robot: {
        ...state.robot,
        ...robot,
      },
    })),
  reset: () =>
    set({
      keys: { w: false, a: false, s: false, d: false, ' ': false },
      robot: initialRobotState,
    }),
}));
