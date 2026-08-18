import { Sensor, type SensorContext } from './Sensor';

export class UltrasonicSensor extends Sensor {
  constructor(maxRange = 2.5, enabled = true) {
    super('ultrasonic', maxRange, enabled);
  }

  update(context: SensorContext): void {
    if (!this.enabled) {
      this.distance = this.maxRange;
      return;
    }

    const { origin, rotationY, obstacles } = context;
    const sensorOrigin = [origin[0], origin[1] + 0.5, origin[2]] as [number, number, number];
    const rayDirection = {
      x: Math.sin(rotationY),
      z: Math.cos(rotationY),
    };

    let closestDistance = this.maxRange;

    for (const obstacle of obstacles) {
      const [ox, oy, oz] = obstacle.position;
      const [sx, sy, sz] = obstacle.size;

      const halfX = sx / 2;
      const halfY = sy / 2;
      const halfZ = sz / 2;

      const minX = ox - halfX;
      const maxX = ox + halfX;
      const minY = oy - halfY;
      const maxY = oy + halfY;
      const minZ = oz - halfZ;
      const maxZ = oz + halfZ;

      const px = sensorOrigin[0];
      const py = sensorOrigin[1];
      const pz = sensorOrigin[2];
      const dx = rayDirection.x;
      const dy = 0;
      const dz = rayDirection.z;

      let tMin = Number.POSITIVE_INFINITY;
      let tMax = Number.NEGATIVE_INFINITY;

      const checkAxis = (originValue: number, dirValue: number, min: number, max: number) => {
        if (Math.abs(dirValue) < 1e-6) {
          if (originValue < min || originValue > max) return false;
          return true;
        }

        const t1 = (min - originValue) / dirValue;
        const t2 = (max - originValue) / dirValue;
        const near = Math.min(t1, t2);
        const far = Math.max(t1, t2);

        tMin = Math.max(tMin, near);
        tMax = Math.min(tMax, far);
        return tMin <= tMax;
      };

      const validX = checkAxis(px, dx, minX, maxX);
      const validY = checkAxis(py, dy, minY, maxY);
      const validZ = checkAxis(pz, dz, minZ, maxZ);

      if (validX && validY && validZ) {
        const hitDistance = Math.max(0, tMin);
        closestDistance = Math.min(closestDistance, hitDistance);
      }
    }

    this.distance = closestDistance;
  }
}
