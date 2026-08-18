export const simulatorDefaults = {
  cameraPosition: [4, 5, 8] as [number, number, number],
  robotPosition: [0, 0.4, 0] as [number, number, number],
  robotRotationY: Math.PI / 4,
};

export const createRobotState = () => ({
  position: [0, 0, 0] as [number, number, number],
  rotationY: 0,
  leftWheelRotation: 0,
  rightWheelRotation: 0,
});
