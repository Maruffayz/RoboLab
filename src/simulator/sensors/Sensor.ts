export interface ObstacleBox {
  position: [number, number, number];
  size: [number, number, number];
}

export interface SensorReading {
  distance: number;
  maxRange: number;
  enabled: boolean;
}

export abstract class Sensor {
  distance: number;
  maxRange: number;
  enabled: boolean;

  constructor(maxRange = 2.5, enabled = true) {
    this.distance = maxRange;
    this.maxRange = maxRange;
    this.enabled = enabled;
  }

  abstract update(
    origin: [number, number, number],
    rotationY: number,
    obstacles: ObstacleBox[],
  ): void;

  getReading(): SensorReading {
    return {
      distance: this.distance,
      maxRange: this.maxRange,
      enabled: this.enabled,
    };
  }
}
