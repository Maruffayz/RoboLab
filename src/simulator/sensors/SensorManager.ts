import { Sensor, type ObstacleBox } from './Sensor';

export class SensorManager {
  private readonly sensors: Sensor[];

  constructor(sensors: Sensor[]) {
    this.sensors = sensors;
  }

  update(origin: [number, number, number], rotationY: number, obstacles: ObstacleBox[]): void {
    for (const sensor of this.sensors) {
      sensor.update(origin, rotationY, obstacles);
    }
  }

  getReadings() {
    return this.sensors.map((sensor) => sensor.getReading());
  }
}
