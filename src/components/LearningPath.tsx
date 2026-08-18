import { learningCourses } from '../data/learningData';

export const LearningPath = () => {
  return (
    <div className="space-y-8">
      {learningCourses.map((course) => (
        <section key={course.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-400">Course</p>
              <h2 className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">{course.title}</h2>
            </div>
            <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 dark:border-blue-900 dark:bg-blue-950/50 dark:text-blue-300">
              {course.modules.length} module
            </span>
          </div>

          <p className="mb-6 text-slate-600 dark:text-slate-300">{course.description}</p>

          <div className="space-y-6">
            {course.modules.map((module) => (
              <div key={module.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-950/60">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{module.title}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{module.description}</p>

                <div className="mt-5 space-y-4">
                  {module.lessons.map((lesson) => (
                    <div key={lesson.id} className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                        <div className="max-w-2xl">
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Lesson</p>
                          <h4 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">{lesson.title}</h4>
                          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{lesson.objective}</p>
                        </div>
                        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-300">
                          {lesson.visualDemo.length} demo steps
                        </div>
                      </div>

                      <div className="mt-5 grid gap-5 lg:grid-cols-2">
                        <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950/70">
                          <h5 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Explanation</h5>
                          <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-200">{lesson.explanation}</p>
                        </div>

                        <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950/70">
                          <h5 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Visual demo</h5>
                          <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-200">
                            {lesson.visualDemo.map((step) => (
                              <li key={step} className="flex items-start gap-2">
                                <span className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
                                <span>{step}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-5 grid gap-5 lg:grid-cols-2">
                        <div className="rounded-2xl bg-slate-950 p-4 text-slate-100">
                          <h5 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">Code example</h5>
                          <pre className="mt-3 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-900 p-3 text-sm text-cyan-300">
                            {lesson.codeExample}
                          </pre>
                        </div>

                        <div className="rounded-2xl bg-slate-950 p-4 text-slate-100">
                          <h5 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">Simulator</h5>
                          <pre className="mt-3 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-900 p-3 text-sm text-emerald-300">
                            {lesson.simulatorSnippet}
                          </pre>
                        </div>
                      </div>

                      <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950/30">
                        <h5 className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-700 dark:text-amber-300">Challenge</h5>
                        <p className="mt-3 text-sm leading-7 text-amber-900 dark:text-amber-100">{lesson.challenge}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};
