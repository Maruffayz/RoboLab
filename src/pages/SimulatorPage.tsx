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

  useEffect(() => {
    const handleShortcuts = (event: KeyboardEvent) => {
      const isMetaPressed = event.metaKey || event.ctrlKey;
      if (isMetaPressed && event.key === 'Enter') {
        event.preventDefault();
        runScript();
      }

      if (event.key === 'Escape') {
        event.preventDefault();
        stopScript();
      }
    };

    window.addEventListener('keydown', handleShortcuts);
    return () => window.removeEventListener('keydown', handleShortcuts);
  }, [runScript, stopScript]);

  const sensorCards = [
    { label: 'Ultrasonic', value: `${robot.ultrasonic.distance.toFixed(1)} cm` },
    { label: 'Encoder', value: `${robot.encoder.ticks.toFixed(0)} ticks` },
    { label: 'Max range', value: `${robot.ultrasonic.maxRange.toFixed(1)} cm` },
    { label: 'Status', value: robot.status },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
        <div className="mx-auto max-w-[1600px] px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="text-lg font-black tracking-tight text-white">RoboLab</div>
              <div className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-slate-300">
                Lesson
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button type="button" onClick={runScript} className="rounded-xl bg-emerald-500 px-3 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400">Run</button>
              <button type="button" onClick={stopScript} className="rounded-xl bg-rose-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-rose-400">Stop</button>
              <button type="button" onClick={() => { reset(); setConsoleLogs([]); appendLog('info', 'Console cleared'); }} className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:bg-slate-800">Reset</button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-4 xl:grid-cols-[1.08fr_1.42fr]">
          <section className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl shadow-slate-950/20">
            <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950/80 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">Code</h2>
              </div>
              <span className="rounded-full border border-slate-700 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400">Python</span>
            </div>
            <div className="h-[500px] overflow-hidden">
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
                  wordWrap: 'on',
                }}
              />
            </div>
          </section>

          <section className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl shadow-slate-950/20">
            <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950/80 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-sky-400" />
                <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">Simulator</h2>
              </div>
              <Badge variant="success">Online</Badge>
            </div>
            <div className="h-[500px]">
              <SimulatorCanvas />
            </div>
          </section>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">Console</h3>
              <button
                type="button"
                onClick={() => setConsoleLogs([])}
                className="rounded-lg border border-slate-700 bg-slate-800 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-slate-200 hover:border-slate-500"
              >
                Clear
              </button>
            </div>
            <div className="max-h-56 space-y-2 overflow-auto font-mono text-xs">
              {consoleLogs.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-700 bg-slate-950/60 p-3 text-slate-400">Console cleared.</div>
              ) : (
                consoleLogs.map((entry) => (
                  <div key={entry.id} className={`rounded-xl border px-3 py-2 ${levelStyles[entry.level]}`}>
                    <span className="mr-2 font-bold uppercase tracking-[0.12em]">{entry.level}</span>
                    <span>{entry.message}</span>
                  </div>
                ))
              )}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-4">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">Sensors</h3>
            <div className="space-y-3">
              {sensorCards.map((item) => (
                <div key={item.label} className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/60 px-3 py-2 text-sm text-slate-300">
                  <span>{item.label}</span>
                  <strong className="text-slate-100">{item.value}</strong>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-4">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">Motors</h3>
            <div className="space-y-3">
              {motorCards.map(({ label, motor }) => (
                <div key={label} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
                  <div className="flex items-center justify-between text-sm text-slate-300">
                    <span>{label}</span>
                    <span className="font-medium text-slate-100">{motor.enabled ? 'Enabled' : 'Disabled'}</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm text-slate-400">
                    <span>Speed</span>
                    <strong className="text-slate-100">{Math.abs(motor.speed).toFixed(1)}</strong>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm text-slate-400">
                    <span>Direction</span>
                    <strong className="capitalize text-slate-100">{motor.direction}</strong>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-4">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">Robot State</h3>
            <div className="space-y-3">
              {hudItems.map((item) => (
                <div key={item.label} className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/60 px-3 py-2 text-sm text-slate-300">
                  <span>{item.label}</span>
                  <strong className="text-slate-100">{item.value}</strong>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
