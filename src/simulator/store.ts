import { create } from 'zustand';

export type RobotStatus = 'idle' | 'forward' | 'backward' | 'turning-left' | 'turning-right';

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

export const useSimulatorStore = create<SimulatorState>((set, get) => ({
  keys: { w: false, a: false, s: false, d: false, ' ': false },
  robot: initialRobotState,
  tick: (dt) => {
    const pressed = get().keys;
    const moveForward = !!pressed.w;
    const moveBackward = !!pressed.s;
    const turnLeft = !!pressed.a;
    const turnRight = !!pressed.d;
    const stop = !!pressed[' '];

    let leftMotorSpeed = 0;
    let rightMotorSpeed = 0;
    let status: RobotStatus = 'idle';

    if (stop) {
      leftMotorSpeed = 0;
      rightMotorSpeed = 0;
      status = 'idle';
    } else if (moveForward && !moveBackward) {
      leftMotorSpeed = 2.4;
      rightMotorSpeed = 2.4;
      status = 'forward';
    } else if (moveBackward && !moveForward) {
      leftMotorSpeed = -2.0;
      rightMotorSpeed = -2.0;
      status = 'backward';
    } else if (turnLeft && !turnRight && !moveForward && !moveBackward) {
      leftMotorSpeed = -1.8;
      rightMotorSpeed = 1.8;
      status = 'turning-left';
    } else if (turnRight && !turnLeft && !moveForward && !moveBackward) {
      leftMotorSpeed = 1.8;
      rightMotorSpeed = -1.8;
      status = 'turning-right';
    } else if (moveForward && turnLeft) {
      leftMotorSpeed = 1.4;
      rightMotorSpeed = 2.8;
      status = 'forward';
    } else if (moveForward && turnRight) {
      leftMotorSpeed = 2.8;
      rightMotorSpeed = 1.4;
      status = 'forward';
    } else if (moveBackward && turnLeft) {
      leftMotorSpeed = -1.4;
      rightMotorSpeed = -2.8;
      status = 'backward';
    } else if (moveBackward && turnRight) {
      leftMotorSpeed = -2.8;
      rightMotorSpeed = -1.4;
      status = 'backward';
    }

    const targetVelocity = ((leftMotorSpeed + rightMotorSpeed) / 2) * 0.8;
    const targetRotation = ((rightMotorSpeed - leftMotorSpeed) * dt * 0.9);

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
          leftMotorSpeed: clamp(leftMotorSpeed, -3, 3),
          rightMotorSpeed: clamp(rightMotorSpeed, -3, 3),
          status,
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
