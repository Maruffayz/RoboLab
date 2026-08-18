import { LearningPath } from '../components/LearningPath';

export const LearnPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-400">Learning System</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-900 dark:text-white">O’quv yo’llari va darslar</h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-600 dark:text-slate-300">
            Har bir kursdan modu-l, dars, mashq va challenge lar orqali robototexnika asoslarini o’rganing.
          </p>
        </div>

        <LearningPath />
      </div>
    </div>
  );
};
