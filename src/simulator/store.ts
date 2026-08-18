import { create } from 'zustand';
import {
  DifferentialDriveRobotAPI,
  DifferentialDriveSimulationEngine,
  type MotorModel,
  type RobotStatus,
} from './robots/robotApi';

export type { RobotStatus };

export interface SimulatorMotorState extends MotorModel {
  label: string;
}

export interface SimulatorRobotState {
  position: [number, number, number];
  rotation: number;
  velocity: number;
  leftMotorSpeed: number;
  rightMotorSpeed: number;
  status: RobotStatus;
  motors: {
    left: SimulatorMotorState;
    right: SimulatorMotorState;
  };
}

interface SimulatorState {
  keys: Record<string, boolean>;
  robot: SimulatorRobotState;
  tick: (dt: number) => void;
  setKey: (key: string, pressed: boolean) => void;
  setRobot: (robot: Partial<SimulatorRobotState>) => void;
  reset: () => void;
}

const createMotorState = (speed: number, label: string): SimulatorMotorState => ({
  speed,
  direction: speed > 0 ? 'forward' : speed < 0 ? 'reverse' : 'stop',
  enabled: Math.abs(speed) > 0.01,
  label,
});

const initialRobotState: SimulatorRobotState = {
  position: [0, 0.4, 0],
  rotation: 0,
  velocity: 0,
  leftMotorSpeed: 0,
  rightMotorSpeed: 0,
  status: 'idle',
  motors: {
    left: createMotorState(0, 'Left Motor'),
    right: createMotorState(0, 'Right Motor'),
  },
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

      const nextLeftMotorSpeed = clamp(motorState.leftMotorSpeed, -3, 3);
      const nextRightMotorSpeed = clamp(motorState.rightMotorSpeed, -3, 3);

      return {
        robot: {
          ...current,
          position: [clamp(updatedX, -8, 8), 0.4, clamp(updatedZ, -8, 8)],
          rotation: nextRotation,
          velocity: clamp(nextVelocity, -2.8, 2.8),
          leftMotorSpeed: nextLeftMotorSpeed,
          rightMotorSpeed: nextRightMotorSpeed,
          status: motorState.status,
          motors: {
            left: {
              ...createMotorState(nextLeftMotorSpeed, 'Left Motor'),
              label: 'Left Motor',
            },
            right: {
              ...createMotorState(nextRightMotorSpeed, 'Right Motor'),
              label: 'Right Motor',
            },
          },
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
    set((state) => {
      const mergedRobot = {
        ...state.robot,
        ...robot,
      };

      const leftMotorSpeed = mergedRobot.leftMotorSpeed ?? 0;
      const rightMotorSpeed = mergedRobot.rightMotorSpeed ?? 0;

      return {
        robot: {
          ...mergedRobot,
          motors: {
            left: {
              ...createMotorState(leftMotorSpeed, 'Left Motor'),
              label: 'Left Motor',
            },
            right: {
              ...createMotorState(rightMotorSpeed, 'Right Motor'),
              label: 'Right Motor',
            },
          },
        },
      };
    }),
  reset: () =>
    set({
      keys: { w: false, a: false, s: false, d: false, ' ': false },
      robot: initialRobotState,
    }),
}));
