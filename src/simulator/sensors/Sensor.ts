export interface ObstacleBox {
  position: [number, number, number];
  size: [number, number, number];
}

export interface SensorReading {
  distance: number;
  maxRange: number;
  enabled: boolean;
}

export type SensorType = 'ultrasonic' | 'encoder' | 'ir' | 'gyro' | 'accelerometer' | 'light' | 'camera';

export interface SensorContext {
  origin: [number, number, number];
  rotationY: number;
  obstacles: ObstacleBox[];
  leftMotorSpeed: number;
  rightMotorSpeed: number;
}

export interface SensorContract {
  type: SensorType;
  enable(): void;
  disable(): void;
  reset(): void;
  read(): SensorReading;
  update(context: SensorContext): void;
}

export abstract class Sensor implements SensorContract {
  readonly type: SensorType;
  protected distance: number;
  protected maxRange: number;
  protected enabled: boolean;

  constructor(type: SensorType, maxRange = 2.5, enabled = true) {
    this.type = type;
    this.distance = maxRange;
    this.maxRange = maxRange;
    this.enabled = enabled;
  }

  enable(): void {
    this.enabled = true;
  }

  disable(): void {
    this.enabled = false;
    this.distance = this.maxRange;
  }

  reset(): void {
    this.distance = this.maxRange;
    this.enabled = true;
  }

  read(): SensorReading {
    return {
      distance: this.distance,
      maxRange: this.maxRange,
      enabled: this.enabled,
    };
  }

  abstract update(context: SensorContext): void;
}
