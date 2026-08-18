import assert from 'node:assert/strict';
import test from 'node:test';

import { ControlledCommandRunner } from '../code/ControlledCommandRunner';
import { DifferentialDriveRobotAPI, DifferentialDriveSimulationEngine } from './robotApi.ts';

test('robot API exposes motion commands with a clean motor abstraction', () => {
  const robot = new DifferentialDriveRobotAPI();

  robot.forward(2.5);
  assert.deepEqual(robot.getMotorState(), {
    leftMotorSpeed: 2.5,
    rightMotorSpeed: 2.5,
    status: 'forward',
  });

  robot.turnLeft(1.8);
  assert.deepEqual(robot.getMotorState(), {
    leftMotorSpeed: -1.8,
    rightMotorSpeed: 1.8,
    status: 'turning-left',
  });

  robot.stop();
  assert.deepEqual(robot.getMotorState(), {
    leftMotorSpeed: 0,
    rightMotorSpeed: 0,
    status: 'idle',
  });
});

test('simulation engine converts key input into motor commands', () => {
  const robot = new DifferentialDriveRobotAPI();
  const engine = new DifferentialDriveSimulationEngine(robot);

  engine.updateFromInput({ w: true, a: false, s: false, d: false, ' ': false }, 0.016);
  assert.equal(robot.getMotorState().status, 'forward');
  assert.ok(robot.getMotorState().leftMotorSpeed > 0);
  assert.ok(robot.getMotorState().rightMotorSpeed > 0);

  engine.updateFromInput({ w: false, a: true, s: false, d: false, ' ': false }, 0.016);
  assert.equal(robot.getMotorState().status, 'turning-left');
  assert.ok(robot.getMotorState().leftMotorSpeed < 0);
  assert.ok(robot.getMotorState().rightMotorSpeed > 0);
});

test('controlled executor accepts only whitelisted robot commands', () => {
  const runner = new ControlledCommandRunner(() => undefined);
  const logs = runner.run(`robot.forward(40)
robot.turn_left(15)
value = robot.get_distance()`, {
    distance: 2.5,
    forward: () => undefined,
    backward: () => undefined,
    turn_left: () => undefined,
    turn_right: () => undefined,
    stop: () => undefined,
    get_distance: () => 2.5,
  });

  assert.ok(logs.some((entry) => entry.includes('robot.forward(40)')));
  assert.ok(logs.some((entry) => entry.includes('Script executed successfully.')));
});

test('controlled executor rejects unknown robot commands', () => {
  const runner = new ControlledCommandRunner(() => undefined);
  const logs = runner.run('robot.launch(99)', {
    distance: 2.5,
    forward: () => undefined,
    backward: () => undefined,
    turn_left: () => undefined,
    turn_right: () => undefined,
    stop: () => undefined,
    get_distance: () => 2.5,
  });

  assert.ok(logs.some((entry) => entry.includes('Unknown robot command.')));
});
