import { Badge } from '../design-system';
import { SimulatorCanvas } from '../simulator/renderer/SimulatorCanvas';

export const SimulatorPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-400">Simulation Lab</p>
            <h1 className="mt-3 text-4xl font-bold text-slate-900 dark:text-white">Robot playground</h1>
          </div>
          <Badge variant="success">Online</Badge>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.45fr_0.55fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <SimulatorCanvas />
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Robot status</h2>
              <div className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                <div className="flex items-center justify-between"><span>Battery</span><strong className="text-slate-900 dark:text-white">92%</strong></div>
                <div className="flex items-center justify-between"><span>Speed</span><strong className="text-slate-900 dark:text-white">1.2 m/s</strong></div>
                <div className="flex items-center justify-between"><span>Heading</span><strong className="text-slate-900 dark:text-white">45°</strong></div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Scene</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                <li>• Ground plane</li>
                <li>• Camera orbit</li>
                <li>• Lighting rig</li>
                <li>• Grid overlay</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
