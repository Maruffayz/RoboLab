export type RobotStatus = 'idle' | 'forward' | 'backward' | 'turning-left' | 'turning-right';

export interface MotorState {
  leftMotorSpeed: number;
  rightMotorSpeed: number;
  status: RobotStatus;
}

export type RobotInputState = Record<string, boolean>;

export interface RobotAPI {
  forward(speed: number): void;
  backward(speed: number): void;
  turnLeft(speed: number): void;
  turnRight(speed: number): void;
  stop(): void;
  setMotorSpeed(left: number, right: number): void;
  getMotorState(): MotorState;
}

export class DifferentialDriveRobotAPI implements RobotAPI {
  private state: MotorState = {
    leftMotorSpeed: 0,
    rightMotorSpeed: 0,
    status: 'idle',
  };

  forward(speed: number): void {
    this.applyMotorState(speed, speed, 'forward');
  }

  backward(speed: number): void {
    this.applyMotorState(-speed, -speed, 'backward');
  }

  turnLeft(speed: number): void {
    this.applyMotorState(-speed, speed, 'turning-left');
  }

  turnRight(speed: number): void {
    this.applyMotorState(speed, -speed, 'turning-right');
  }

  stop(): void {
    this.applyMotorState(0, 0, 'idle');
  }

  setMotorSpeed(left: number, right: number): void {
    this.state = {
      leftMotorSpeed: left,
      rightMotorSpeed: right,
      status: this.resolveStatus(left, right),
    };
  }

  getMotorState(): MotorState {
    return { ...this.state };
  }

  private applyMotorState(left: number, right: number, status: RobotStatus): void {
    this.state = {
      leftMotorSpeed: left,
      rightMotorSpeed: right,
      status,
    };
  }

  private resolveStatus(left: number, right: number): RobotStatus {
    if (left === 0 && right === 0) return 'idle';
    if (left > 0 && right > 0) return 'forward';
    if (left < 0 && right < 0) return 'backward';
    if (left < 0 && right > 0) return 'turning-left';
    if (left > 0 && right < 0) return 'turning-right';
    return 'idle';
  }
}

export class MotorController {
  private readonly robot: RobotAPI;

  constructor(robot: RobotAPI) {
    this.robot = robot;
  }

  forward(speed = 2.4): void {
    this.robot.forward(speed);
  }

  backward(speed = 2.0): void {
    this.robot.backward(speed);
  }

  turnLeft(speed = 1.8): void {
    this.robot.turnLeft(speed);
  }

  turnRight(speed = 1.8): void {
    this.robot.turnRight(speed);
  }

  stop(): void {
    this.robot.stop();
  }

  setMotorSpeed(left: number, right: number): void {
    this.robot.setMotorSpeed(left, right);
  }

  getMotorState(): MotorState {
    return this.robot.getMotorState();
  }
}

export class DifferentialDriveSimulationEngine {
  private readonly motorController: MotorController;

  constructor(robotOrController: RobotAPI | MotorController) {
    this.motorController = robotOrController instanceof MotorController ? robotOrController : new MotorController(robotOrController);
  }

  updateFromInput(keys: RobotInputState, _dt: number): MotorState {
    const pressed = keys;
    const moveForward = !!pressed.w;
    const moveBackward = !!pressed.s;
    const turnLeft = !!pressed.a;
    const turnRight = !!pressed.d;
    const stop = !!pressed[' '];

    let leftMotorSpeed = 0;
    let rightMotorSpeed = 0;

    if (stop) {
      leftMotorSpeed = 0;
      rightMotorSpeed = 0;
    } else if (moveForward && !moveBackward) {
      leftMotorSpeed = 2.4;
      rightMotorSpeed = 2.4;
    } else if (moveBackward && !moveForward) {
      leftMotorSpeed = -2.0;
      rightMotorSpeed = -2.0;
    } else if (turnLeft && !turnRight && !moveForward && !moveBackward) {
      leftMotorSpeed = -1.8;
      rightMotorSpeed = 1.8;
    } else if (turnRight && !turnLeft && !moveForward && !moveBackward) {
      leftMotorSpeed = 1.8;
      rightMotorSpeed = -1.8;
    } else if (moveForward && turnLeft) {
      leftMotorSpeed = 1.4;
      rightMotorSpeed = 2.8;
    } else if (moveForward && turnRight) {
      leftMotorSpeed = 2.8;
      rightMotorSpeed = 1.4;
    } else if (moveBackward && turnLeft) {
      leftMotorSpeed = -1.4;
      rightMotorSpeed = -2.8;
    } else if (moveBackward && turnRight) {
      leftMotorSpeed = -2.8;
      rightMotorSpeed = -1.4;
    }

    this.motorController.setMotorSpeed(leftMotorSpeed, rightMotorSpeed);
    return this.motorController.getMotorState();
  }
}
