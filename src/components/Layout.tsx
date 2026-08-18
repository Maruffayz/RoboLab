import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { useThemeStore } from '../store/themeStore';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { isDark } = useThemeStore();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <footer className="border-t border-slate-200 bg-slate-950 text-slate-300 dark:border-slate-800">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-lg font-bold text-white">
                🤖
              </div>
              <span className="text-xl font-bold text-white">RoboLearn</span>
            </div>
            <p className="max-w-sm text-sm text-slate-400">
              Learn robotics, build real systems, and develop the skills to design smarter machines for tomorrow.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Explore</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              <li>Courses</li>
              <li>Simulator</li>
              <li>Challenges</li>
              <li>Projects</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Connect</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              <li>Community</li>
              <li>Mentors</li>
              <li>Support</li>
              <li>Careers</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800">
          <div className="mx-auto max-w-7xl px-4 py-5 text-center text-sm text-slate-400 sm:px-6 lg:px-8">
            &copy; 2026 RoboLearn. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};
