import { useCallback, useEffect, useMemo, useState } from 'react';
import Editor from '@monaco-editor/react';
import { Badge } from '../design-system';
import { useSimulatorStore } from '../simulator/store';
import { SimulatorCanvas } from '../simulator/renderer/SimulatorCanvas';
import { ControlledCommandRunner } from '../simulator/code/ControlledCommandRunner';

const defaultScript = `robot.forward(50)
robot.get_distance()
robot.turn_left(15)
robot.stop()
`;

type ConsoleLevel = 'info' | 'warning' | 'error' | 'success';

type ConsoleEntry = {
  id: number;
  level: ConsoleLevel;
  message: string;
};

const levelStyles: Record<ConsoleLevel, string> = {
  info: 'border-sky-500/30 bg-sky-500/10 text-sky-200',
  warning: 'border-amber-500/30 bg-amber-500/10 text-amber-200',
  error: 'border-rose-500/30 bg-rose-500/10 text-rose-200',
  success: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200',
};

export const SimulatorPage = () => {
  const robot = useSimulatorStore((state) => state.robot);
  const setKey = useSimulatorStore((state) => state.setKey);
  const applyMotorCommand = useSimulatorStore((state) => state.applyMotorCommand);
  const reset = useSimulatorStore((state) => state.reset);
  const [code, setCode] = useState(defaultScript);
  const [consoleLogs, setConsoleLogs] = useState<ConsoleEntry[]>([
    { id: 1, level: 'success', message: 'Simulation started' },
    { id: 2, level: 'info', message: 'Robot initialized' },
    { id: 3, level: 'info', message: `Motor left: ${Math.round(Math.abs(robot.motors.left.speed) / 3 * 100)}%` },
    { id: 4, level: 'info', message: `Motor right: ${Math.round(Math.abs(robot.motors.right.speed) / 3 * 100)}%` },
    { id: 5, level: 'info', message: `Ultrasonic: ${robot.ultrasonic.distance.toFixed(1)} cm` },
    { id: 6, level: 'success', message: 'Robot moving' },
  ]);

  const appendLog = useCallback((level: ConsoleLevel, message: string) => {
    setConsoleLogs((current) => [...current, { id: Date.now() + Math.random(), level, message }]);
  }, []);

  const runner = useMemo(
    () =>
      new ControlledCommandRunner((entry) => {
        appendLog(entry.type === 'warn' ? 'warning' : entry.type, entry.message);
      }),
    [appendLog],
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (['w', 'a', 's', 'd', ' '].includes(key)) {
        event.preventDefault();
        setKey(key, true);
      }
    };

    const onKeyUp = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (['w', 'a', 's', 'd', ' '].includes(key)) {
        setKey(key, false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [setKey]);

  const hudItems = [
    { label: 'Speed', value: `${robot.velocity.toFixed(2)} m/s` },
    { label: 'Position', value: `(${robot.position[0].toFixed(2)}, ${robot.position[2].toFixed(2)})` },
    { label: 'Rotation', value: `${(robot.rotation * 180 / Math.PI).toFixed(0)}°` },
    { label: 'Status', value: robot.status },
    { label: 'Ultrasonic', value: `${(robot.ultrasonic.distance * 100).toFixed(1)} cm` },
    { label: 'Encoder', value: `${robot.encoder.ticks.toFixed(0)} ticks` },
  ];

  const motorCards = [
    { label: 'Left Motor', motor: robot.motors.left },
    { label: 'Right Motor', motor: robot.motors.right },
  ];

  const runScript = () => {
    appendLog('info', 'Simulation started');
    appendLog('info', `Motor left: ${Math.round(Math.abs(robot.motors.left.speed) / 3 * 100)}%`);
    appendLog('info', `Motor right: ${Math.round(Math.abs(robot.motors.right.speed) / 3 * 100)}%`);
    appendLog('info', `Ultrasonic: ${robot.ultrasonic.distance.toFixed(1)} cm`);

    const logs = runner.run(code, {
      distance: robot.ultrasonic.distance,
      forward: (speed: number) => applyMotorCommand(speed, speed, 'forward'),
      backward: (speed: number) => applyMotorCommand(-speed, -speed, 'backward'),
      turn_left: (speed: number) => applyMotorCommand(-speed, speed, 'turning-left'),
      turn_right: (speed: number) => applyMotorCommand(speed, -speed, 'turning-right'),
      stop: () => applyMotorCommand(0, 0, 'idle'),
      get_distance: () => robot.ultrasonic.distance,
    });

    logs.forEach((log) => {
      const normalized = log.startsWith('Error:') ? 'error' : log.includes('success') || log.includes('Success') ? 'success' : 'info';
      appendLog(normalized, log);
    });
  };

  const stopScript = () => {
    applyMotorCommand(0, 0, 'idle');
    appendLog('warning', 'Execution stopped.');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-400">Simulation Lab</p>
            <h1 className="mt-3 text-4xl font-bold text-slate-900 dark:text-white">Robot playground</h1>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="success">Online</Badge>
            <span className="text-sm text-slate-500 dark:text-slate-400">WASD / Space</span>
          </div>
        </div>

        <div className="mb-6 grid gap-4 xl:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Code Editor</h2>
              <div className="flex items-center gap-2">
                <button type="button" onClick={runScript} className="rounded-xl bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-500">Run</button>
                <button type="button" onClick={() => { reset(); setConsoleLogs([]); appendLog('info', 'Console cleared'); }} className="rounded-xl bg-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600">Reset</button>
                <button type="button" onClick={stopScript} className="rounded-xl bg-rose-600 px-3 py-2 text-sm font-medium text-white hover:bg-rose-500">Stop</button>
              </div>
            </div>
            <div className="h-[360px] overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700">
              <Editor
                height="100%"
                defaultLanguage="python"
                theme="vs-dark"
                value={code}
                onChange={(value) => setCode(value ?? defaultScript)}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: 'on',
                  padding: { top: 16 },
                  scrollBeyondLastLine: false,
                  roundedSelection: false,
                }}
              />
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">HUD</h2>
            </div>
            <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              {hudItems.map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-4 rounded-xl bg-slate-50 px-3 py-2 dark:bg-slate-800/70">
                  <span>{item.label}</span>
                  <strong className="text-slate-900 dark:text-white">{item.value}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <SimulatorCanvas />
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Motor panel</h2>
              <div className="mt-4 space-y-3">
                {motorCards.map(({ label, motor }) => (
                  <div key={label} className="rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/70">
                    <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
                      <span>{label}</span>
                      <span className="font-medium text-slate-900 dark:text-white">{motor.enabled ? 'Enabled' : 'Disabled'}</span>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-sm">
                      <span className="text-slate-500 dark:text-slate-400">Speed</span>
                      <strong className="text-slate-900 dark:text-white">{Math.abs(motor.speed).toFixed(1)}</strong>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-sm">
                      <span className="text-slate-500 dark:text-slate-400">Direction</span>
                      <strong className="capitalize text-slate-900 dark:text-white">{motor.direction}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Controls</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                <li>• W = Forward</li>
                <li>• S = Backward</li>
                <li>• A = Left</li>
                <li>• D = Right</li>
                <li>• Space = Stop</li>
              </ul>
            </div>
          </aside>
        </div>

        <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-950 p-4 text-sm text-slate-200 shadow-sm dark:border-slate-800">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h2 className="font-semibold text-white">Console</h2>
            <button
              type="button"
              onClick={() => setConsoleLogs([])}
              className="rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs font-medium text-slate-200 transition hover:border-slate-500 hover:bg-slate-700"
            >
              Clear
            </button>
          </div>
          <div className="max-h-56 space-y-2 overflow-auto font-mono text-xs">
            {consoleLogs.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-700 bg-slate-900/60 p-3 text-slate-400">Console cleared.</div>
            ) : (
              consoleLogs.map((entry) => (
                <div key={entry.id} className={`rounded-xl border px-3 py-2 ${levelStyles[entry.level]}`}>
                  <span className="mr-2 font-bold uppercase tracking-[0.12em]">{entry.level}</span>
                  <span>{entry.message}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
