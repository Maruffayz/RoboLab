import { Sensor, type ObstacleBox, type SensorContext } from './Sensor';

export class SensorManager {
  private readonly sensors: Sensor[];

  constructor(sensors: Sensor[]) {
    this.sensors = sensors;
  }

  register(sensor: Sensor): void {
    this.sensors.push(sensor);
  }

  update(
    origin: [number, number, number],
    rotationY: number,
    obstacles: ObstacleBox[],
    leftMotorSpeed = 0,
    rightMotorSpeed = 0,
  ): void {
    const context: SensorContext = {
      origin,
      rotationY,
      obstacles,
      leftMotorSpeed,
      rightMotorSpeed,
    };

    for (const sensor of this.sensors) {
      sensor.update(context);
    }
  }

  readAll() {
    return this.sensors.map((sensor) => ({
      type: sensor.type,
      reading: sensor.read(),
    }));
  }

  resetAll(): void {
    this.sensors.forEach((sensor) => sensor.reset());
  }

  enableAll(): void {
    this.sensors.forEach((sensor) => sensor.enable());
  }

  disableAll(): void {
    this.sensors.forEach((sensor) => sensor.disable());
  }
}
