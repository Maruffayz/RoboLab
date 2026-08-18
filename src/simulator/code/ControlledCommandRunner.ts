export type CommandLogEntry = {
  type: 'info' | 'warn' | 'error';
  message: string;
};

export interface RobotCommandContext {
  distance: number;
  forward: (speed: number) => void;
  backward: (speed: number) => void;
  turn_left: (speed: number) => void;
  turn_right: (speed: number) => void;
  stop: () => void;
  get_distance: () => number;
}

const allowedCommands = new Set([
  'forward',
  'backward',
  'turn_left',
  'turn_right',
  'stop',
  'get_distance',
]);

export class ControlledCommandRunner {
  private readonly onLog: (entry: CommandLogEntry) => void;

  constructor(onLog: (entry: CommandLogEntry) => void) {
    this.onLog = onLog;
  }

  run(code: string, context: RobotCommandContext): string[] {
    const logs: string[] = [];

    try {
      const statements = code
        .split(/\r?\n|;/)
        .map((statement) => statement.trim())
        .filter((statement) => statement.length > 0);

      if (statements.length === 0) {
        throw new Error('Unknown robot command.');
      }

      const robot = {
        forward: (speed: number) => {
          context.forward(speed);
          logs.push(`robot.forward(${speed})`);
        },
        backward: (speed: number) => {
          context.backward(speed);
          logs.push(`robot.backward(${speed})`);
        },
        turn_left: (speed: number) => {
          context.turn_left(speed);
          logs.push(`robot.turn_left(${speed})`);
        },
        turn_right: (speed: number) => {
          context.turn_right(speed);
          logs.push(`robot.turn_right(${speed})`);
        },
        stop: () => {
          context.stop();
          logs.push('robot.stop()');
        },
        get_distance: () => {
          const distance = context.get_distance();
          logs.push(`robot.get_distance() -> ${distance}`);
          return distance;
        },
      };

      const variables: Record<string, number> = {};

      for (const statement of statements) {
        const assignmentMatch = statement.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*=\s*robot\.(\w+)\((.*)\)$/);
        const callMatch = statement.match(/^robot\.(\w+)\((.*)\)$/);

        if (assignmentMatch) {
          const [, variableName, methodName, argumentText] = assignmentMatch;
          const value = this.executeRobotCall(robot, methodName, argumentText);
          variables[variableName] = value;
          logs.push(`${variableName} = ${value}`);
          continue;
        }

        if (callMatch) {
          const [, methodName, argumentText] = callMatch;
          this.executeRobotCall(robot, methodName, argumentText);
          continue;
        }

        throw new Error('Unknown robot command.');
      }

      this.onLog({ type: 'info', message: 'Script executed successfully.' });
      logs.push('Script executed successfully.');
      return logs;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown script error';
      this.onLog({ type: 'error', message });
      return [...logs, `Error: ${message}`];
    }
  }

  private executeRobotCall(robot: Record<string, unknown>, methodName: string, argumentText: string): number {
    if (!allowedCommands.has(methodName)) {
      throw new Error('Unknown robot command.');
    }

    const trimmedArgument = argumentText.trim();
    const numericValue = Number(trimmedArgument);

    if (!Number.isFinite(numericValue)) {
      throw new Error('Unknown robot command.');
    }

    const method = robot[methodName];

    if (typeof method !== 'function') {
      throw new Error('Unknown robot command.');
    }

    if (methodName === 'get_distance') {
      return (method as () => number).call(robot) as number;
    }

    return (method as (value: number) => number).call(robot, numericValue) as number;
  }
}
