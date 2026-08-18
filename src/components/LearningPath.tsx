import { useEffect, useMemo, useState } from 'react';
import { learningCourses } from '../data/learningData';
import { ControlledCommandRunner } from '../simulator/code/ControlledCommandRunner';

const STORAGE_KEY = 'robolab-lesson-progress-v1';

const defaultSensorDistances: Record<string, number> = {
  'robot-structure': 32.4,
  'movement-principles': 41.5,
  'if-logic': 18.6,
  'motor-drive': 26.8,
  'ultrasonic-sensor': 24.2,
  'path-following': 35.3,
  'joint-control': 19.7,
  'decision-loop': 15.4,
};

const readProgress = () => {
  if (typeof window === 'undefined') return {} as Record<string, boolean>;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, boolean>) : {};
  } catch {
    return {} as Record<string, boolean>;
  }
};

export const LearningPath = () => {
  const allLessons = useMemo(
    () => learningCourses.flatMap((course) => course.modules.flatMap((module) => module.lessons)),
    [],
  );

  const [selectedLessonId, setSelectedLessonId] = useState(allLessons[0]?.id ?? 'robot-structure');
  const [progress, setProgress] = useState<Record<string, boolean>>(() => readProgress());
  const [code, setCode] = useState<string>('');
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    'Simulation started',
    'Robot initialized',
    'Ultrasonic sensor ready',
  ]);

  const selectedLesson = useMemo(
    () => allLessons.find((lesson) => lesson.id === selectedLessonId) ?? allLessons[0],
    [allLessons, selectedLessonId],
  );

  useEffect(() => {
    if (!selectedLesson) return;
    setCode(selectedLesson.codeExample);
    setConsoleLogs([
      'Simulation started',
      `Lesson: ${selectedLesson.title}`,
      'Robot initialized',
      `Ultrasonic: ${defaultSensorDistances[selectedLesson.id] ?? 20} cm`,
    ]);
  }, [selectedLesson]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    }
  }, [progress]);

  const runner = useMemo(
    () =>
      new ControlledCommandRunner((entry) => {
        setConsoleLogs((current) => [...current, `${entry.type.toUpperCase()}: ${entry.message}`]);
      }),
    [],
  );

  const sensorDistance = defaultSensorDistances[selectedLesson?.id ?? 'robot-structure'] ?? 20;
  const completedCount = Object.values(progress).filter(Boolean).length;
  const completionPercent = Math.round((completedCount / Math.max(allLessons.length, 1)) * 100);

  const runLesson = () => {
    const codeDistance = sensorDistance;
    const logs = runner.run(code, {
      distance: codeDistance,
      forward: () => setConsoleLogs((current) => [...current, 'INFO: Robot.forward() executed']),
      backward: () => setConsoleLogs((current) => [...current, 'INFO: Robot.backward() executed']),
      turn_left: () => setConsoleLogs((current) => [...current, 'INFO: Robot.turn_left() executed']),
      turn_right: () => setConsoleLogs((current) => [...current, 'INFO: Robot.turn_right() executed']),
      stop: () => setConsoleLogs((current) => [...current, 'INFO: Robot.stop() executed']),
      get_distance: () => codeDistance,
    });

    setConsoleLogs((current) => [...current, ...logs.map((log) => log)]);
    setProgress((current) => ({
      ...current,
      [selectedLesson.id]: true,
    }));
  };

  if (!selectedLesson) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-400">Progress</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">Lesson progress</h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-3 w-40 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
              <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-emerald-500" style={{ width: `${completionPercent}%` }} />
            </div>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{completionPercent}%</span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <aside className="space-y-4">
          {learningCourses.map((course) => (
            <div key={course.id} className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">{course.title}</p>
              <div className="mt-4 space-y-2">
                {course.modules.flatMap((module) =>
                  module.lessons.map((lesson) => (
                    <button
                      key={lesson.id}
                      type="button"
                      onClick={() => setSelectedLessonId(lesson.id)}
                      className={`flex w-full items-center justify-between rounded-2xl border px-3 py-3 text-left text-sm transition ${
                        lesson.id === selectedLesson.id
                          ? 'border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-500 dark:bg-blue-950/40 dark:text-blue-200'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-200'
                      }`}
                    >
                      <span>{lesson.title}</span>
                      <span className="text-xs font-medium uppercase tracking-[0.12em]">
                        {progress[lesson.id] ? 'Done' : 'Open'}
                      </span>
                    </button>
                  )),
                )}
              </div>
            </div>
          ))}
        </aside>

        <section className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-400">Lesson</p>
                <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{selectedLesson.title}</h2>
              </div>
              <div className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/35 dark:text-emerald-300">
                {progress[selectedLesson.id] ? 'Completed' : 'In progress'}
              </div>
            </div>

            <p className="mt-5 text-lg leading-8 text-slate-700 dark:text-slate-200">{selectedLesson.explanation}</p>

            <div className="mt-6 grid gap-5 lg:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950/60">
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Objective</h3>
                <p className="mt-3 text-base text-slate-700 dark:text-slate-200">{selectedLesson.objective}</p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950/60">
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Challenge</h3>
                <p className="mt-3 text-base text-slate-700 dark:text-slate-200">{selectedLesson.challenge}</p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Interactive visualization</h3>
                <span className="rounded-full border border-sky-200 bg-sky-50 px-2.5 py-1 text-xs font-medium text-sky-700 dark:border-sky-900 dark:bg-sky-950/40 dark:text-sky-300">
                  {sensorDistance.toFixed(1)} cm
                </span>
              </div>

              <div className="relative h-36 overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 dark:border-slate-700">
                <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-emerald-500/20 to-transparent" />
                <div className="absolute left-5 bottom-8 flex items-end gap-3">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-cyan-400 bg-cyan-500/15 text-xs font-bold text-cyan-300">
                    Robot
                  </div>
                  <div
                    className="absolute bottom-6 left-20 h-1 rounded-full bg-cyan-400 shadow-[0_0_14px_rgba(34,211,238,0.9)]"
                    style={{ width: `${Math.max(sensorDistance * 6, 30)}px` }}
                  />
                </div>

                <div className="absolute right-8 bottom-8 flex h-14 w-14 items-center justify-center rounded-xl border-2 border-amber-400 bg-amber-500/15 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-200">
                  Obstacle
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950/60">
                <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Code example</h4>
                <pre className="mt-3 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-950 p-3 text-sm text-cyan-300">
                  {selectedLesson.codeExample}
                </pre>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Lesson simulator</h3>
                <span className="rounded-full border border-violet-200 bg-violet-50 px-2.5 py-1 text-xs font-medium text-violet-700 dark:border-violet-900 dark:bg-violet-950/35 dark:text-violet-300">
                  sensor mode
                </span>
              </div>

              <textarea
                value={code}
                onChange={(event) => setCode(event.target.value)}
                className="h-48 w-full resize-none rounded-2xl border border-slate-200 bg-slate-950 p-3 font-mono text-sm text-cyan-300 outline-none ring-0 focus:border-blue-500 dark:border-slate-700"
              />

              <div className="mt-4 flex gap-3">
                <button
                  type="button"
                  onClick={runLesson}
                  className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
                >
                  Run
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setConsoleLogs(['Simulation started', 'Robot initialized', 'Ultrasonic sensor ready']);
                    setProgress((current) => ({ ...current, [selectedLesson.id]: false }));
                  }}
                  className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-500"
                >
                  Reset
                </button>
              </div>

              <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-950 p-4 dark:border-slate-700">
                <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Console</h4>
                <div className="mt-3 space-y-2 font-mono text-xs text-slate-200">
                  {consoleLogs.map((entry, index) => (
                    <div key={`${entry}-${index}`} className="rounded-lg border border-slate-800 bg-slate-900 px-2 py-1.5">
                      {entry}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
