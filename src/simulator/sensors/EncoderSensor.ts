import { Sensor, type SensorContext } from './Sensor';

export class EncoderSensor extends Sensor {
  private ticks = 0;

  constructor(maxRange = 1000, enabled = true) {
    super('encoder', maxRange, enabled);
  }

  update(context: SensorContext): void {
    if (!this.enabled) {
      this.distance = 0;
      return;
    }

    const left = Math.abs(context.leftMotorSpeed);
    const right = Math.abs(context.rightMotorSpeed);
    const average = (left + right) / 2;

    this.ticks += Math.max(0, Math.round(average * 10));
    this.distance = Math.min(this.maxRange, this.ticks / 10);
  }

  read() {
    return {
      distance: this.distance,
      maxRange: this.maxRange,
      enabled: this.enabled,
    };
  }

  reset(): void {
    this.ticks = 0;
    this.distance = 0;
    this.enabled = true;
  }

  getTicks(): number {
    return this.ticks;
  }
}
