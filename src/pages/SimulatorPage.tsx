import { useEffect } from 'react';
import { Badge } from '../design-system';
import { useSimulatorStore } from '../simulator/store';
import { SimulatorCanvas } from '../simulator/renderer/SimulatorCanvas';

export const SimulatorPage = () => {
  const robot = useSimulatorStore((state) => state.robot);
  const setKey = useSimulatorStore((state) => state.setKey);

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
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
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

        <div className="grid gap-6 xl:grid-cols-[1.45fr_0.55fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <SimulatorCanvas />
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">HUD</h2>
              <div className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                {hudItems.map((item) => (
                  <div key={item.label} className="flex items-center justify-between gap-4">
                    <span>{item.label}</span>
                    <strong className="text-slate-900 dark:text-white">{item.value}</strong>
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
      </div>
    </div>
  );
};
