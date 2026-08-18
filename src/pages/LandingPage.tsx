import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  Bot,
  BrainCircuit,
  Cable,
  ChevronRight,
  Code2,
  Cpu,
  Gauge,
  Gamepad2,
  Layers3,
  Route,
  Rocket,
  Sparkles,
  Target,
  Trophy,
  Zap,
} from 'lucide-react';

const learningPaths = [
  { title: 'Robotics Fundamentals', icon: BrainCircuit, accent: 'from-cyan-500 to-blue-500' },
  { title: 'Programming', icon: Code2, accent: 'from-violet-500 to-indigo-500' },
  { title: 'Sensors', icon: Cpu, accent: 'from-emerald-500 to-teal-500' },
  { title: 'Motors', icon: Zap, accent: 'from-amber-500 to-orange-500' },
  { title: 'Mobile Robotics', icon: Route, accent: 'from-rose-500 to-pink-500' },
  { title: 'Robot Arms', icon: Bot, accent: 'from-sky-500 to-cyan-500' },
  { title: 'Autonomous Robotics', icon: Gauge, accent: 'from-fuchsia-500 to-purple-500' },
];

const howItWorks = [
  { title: 'Learn', text: 'Build core robotics and engineering intuition through guided lessons.', icon: BookOpen },
  { title: 'Code', text: 'Write real logic for motion, sensors, and decision-making.', icon: Code2 },
  { title: 'Simulate', text: 'Test robots in a physics-aware virtual environment before hardware.', icon: Gamepad2 },
  { title: 'Challenge', text: 'Solve missions and compete in real-world robotics scenarios.', icon: Target },
];

const challengeItems = [
  { title: 'Maze Runner', subtitle: 'Navigate using sensor feedback', level: 'Beginner', color: 'bg-emerald-500/10 text-emerald-600 ring-emerald-500/30' },
  { title: 'Warehouse Bot', subtitle: 'Pick and place with precision', level: 'Intermediate', color: 'bg-blue-500/10 text-blue-600 ring-blue-500/30' },
  { title: 'Autonomous Scout', subtitle: 'Map terrain and optimize routes', level: 'Advanced', color: 'bg-violet-500/10 text-violet-600 ring-violet-500/30' },
];

const projectCards = [
  { title: 'Autonomous Rover', description: 'Build a rover that follows paths, avoids obstacles, and maps environments.', tag: 'AI + Navigation' },
  { title: 'Smart Arm', description: 'Program robot arms for sorting, manufacturing, and repeatable precision tasks.', tag: 'Manipulation' },
  { title: 'Drone Lab', description: 'Design flight logic and stabilization for real-time autonomous operations.', tag: 'Aerial Systems' },
];

const xpSteps = [
  'Master concepts with interactive micro-lessons',
  'Earn badges by completing coding tasks',
  'Unlock labs and challenge-based progression',
];

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="max-w-2xl mx-auto text-center mb-12">
      <p className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300">
        {eyebrow}
      </p>
      <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">{title}</h2>
      <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">{description}</p>
    </div>
  );
}

function WorkflowStep({ item, index }: { item: { title: string; text: string; icon: typeof BookOpen }; index: number }) {
  const Icon = item.icon;

  return (
    <div className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20">
        <Icon size={22} />
      </div>
      <div className="mb-3 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200">
          {index + 1}
        </span>
        {item.title}
      </div>
      <p className="text-slate-600 dark:text-slate-300">{item.text}</p>
    </div>
  );
}

export const LandingPage = () => {
  return (
    <div className="bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.18),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(79,70,229,0.18),_transparent_30%)]" />
        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-28 lg:pt-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-4 py-2 text-sm font-medium text-blue-700 shadow-sm backdrop-blur dark:border-blue-900 dark:bg-slate-900/80 dark:text-blue-300">
                <Sparkles size={16} />
                Smart robotics learning platform
              </div>

              <h1 className="mt-8 max-w-xl text-4xl font-black tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
                Build robots.
                <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
                  Code the future.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                Learn robotics fundamentals, write logic, simulate behavior, and solve real engineering challenges in one immersive STEM platform.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link to="/learn" className="btn-primary inline-flex items-center justify-center gap-2">
                  Start learning
                  <ArrowRight size={18} />
                </Link>
                <Link to="/simulator" className="btn-secondary inline-flex items-center justify-center gap-2">
                  Try simulator
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap gap-8 text-sm text-slate-600 dark:text-slate-300">
                <div>
                  <span className="block text-2xl font-bold text-slate-900 dark:text-white">15k+</span>
                  learners
                </div>
                <div>
                  <span className="block text-2xl font-bold text-slate-900 dark:text-white">120+</span>
                  labs
                </div>
                <div>
                  <span className="block text-2xl font-bold text-slate-900 dark:text-white">4.9/5</span>
                  rating
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="mx-auto max-w-md rounded-[2rem] border border-slate-200 bg-white/80 p-5 shadow-[0_25px_80px_rgba(15,23,42,0.16)] backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
                <div className="rounded-[1.5rem] bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 p-6 text-white">
                  <div className="mb-6 flex items-center justify-between text-sm text-slate-300">
                    <span className="inline-flex items-center gap-2 rounded-full bg-slate-700/80 px-3 py-1">
                      <Cable size={14} />
                      live workspace
                    </span>
                    <span className="rounded-full bg-emerald-500/20 px-2 py-1 text-xs font-semibold text-emerald-300">online</span>
                  </div>

                  <div className="relative mx-auto flex h-72 w-full max-w-xs items-center justify-center">
                    <div className="absolute h-52 w-52 rounded-full border border-blue-400/40" />
                    <div className="absolute h-64 w-64 rounded-full border border-indigo-400/20" />
                    <div className="absolute h-28 w-28 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 blur-2xl opacity-60" />

                    <div className="relative h-44 w-44 rounded-[2rem] bg-gradient-to-br from-slate-200 via-slate-100 to-slate-300 p-4 shadow-2xl shadow-cyan-500/20">
                      <div className="absolute left-1/2 top-2 h-3 w-16 -translate-x-1/2 rounded-full bg-slate-400" />
                      <div className="absolute left-4 top-10 h-10 w-10 rounded-xl bg-slate-700" />
                      <div className="absolute right-4 top-10 h-10 w-10 rounded-xl bg-slate-700" />
                      <div className="absolute bottom-5 left-1/2 h-10 w-16 -translate-x-1/2 rounded-xl bg-slate-700" />
                      <div className="absolute -left-5 top-14 h-8 w-8 rounded-full bg-slate-800" />
                      <div className="absolute -right-5 top-14 h-8 w-8 rounded-full bg-slate-800" />
                      <div className="absolute -bottom-5 left-1/2 h-8 w-14 -translate-x-1/2 rounded-full bg-cyan-400/90" />
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                    <div className="rounded-xl bg-slate-800/80 p-3">
                      <div className="text-lg font-bold text-cyan-300">84%</div>
                      <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400">signal</div>
                    </div>
                    <div className="rounded-xl bg-slate-800/80 p-3">
                      <div className="text-lg font-bold text-violet-300">12ms</div>
                      <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400">latency</div>
                    </div>
                    <div className="rounded-xl bg-slate-800/80 p-3">
                      <div className="text-lg font-bold text-emerald-300">7/7</div>
                      <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400">sensors</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main>
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="How it works"
            title="From first concept to autonomous robot"
            description="A clear learning path that turns curiosity into real technical skills through practice, feedback, and challenge-based progress."
          />

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {howItWorks.map((item, index) => (
              <WorkflowStep key={item.title} item={item} index={index} />
            ))}
          </div>
        </section>

        <section className="bg-white py-20 dark:bg-slate-900">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Learning paths"
              title="Choose a path and start building core robotics skills"
              description="Follow structured roadmaps from fundamentals to autonomous systems with hands-on exercises and project-based milestones."
            />

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {learningPaths.map(({ title, icon: Icon, accent }) => (
                <div key={title} className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl dark:border-slate-800 dark:bg-slate-950">
                  <div className={`mb-4 inline-flex rounded-xl bg-gradient-to-br ${accent} p-3 text-white shadow-lg`}>
                    <Icon size={22} />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{title}</h3>
                  <div className="mt-5 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                    <span>Beginner friendly</span>
                    <ChevronRight size={16} className="transition group-hover:translate-x-1" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <SectionHeading
                eyebrow="Simulator preview"
                title="Test logic before you build hardware"
                description="Run bot behaviors in a visual simulation, tune algorithms, and inspect sensor feedback in real time."
              />

              <div className="space-y-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                    <Code2 size={14} />
                    robot_controller.py
                  </div>
                  <pre className="overflow-x-auto rounded-xl bg-slate-950 p-4 text-sm text-cyan-300">
{`while path_active:
    if sensor_left > 25:
        turn('left', 12)
    elif sensor_right > 25:
        turn('right', 12)
    else:
        move('forward', 1.2)
`}
                  </pre>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl bg-slate-900 p-4 text-white">
                    <div className="text-2xl font-bold text-cyan-300">3.2s</div>
                    <div className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-400">response</div>
                  </div>
                  <div className="rounded-2xl bg-blue-600 p-4 text-white">
                    <div className="text-2xl font-bold">92%</div>
                    <div className="mt-2 text-xs uppercase tracking-[0.2em] text-blue-100">accuracy</div>
                  </div>
                  <div className="rounded-2xl bg-emerald-500 p-4 text-white">
                    <div className="text-2xl font-bold">24</div>
                    <div className="mt-2 text-xs uppercase tracking-[0.2em] text-emerald-50">missions</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 p-6 shadow-[0_25px_80px_rgba(79,70,229,0.2)] dark:border-slate-700">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Mission room</p>
                  <h3 className="mt-2 text-2xl font-bold text-white">Obstacle maze</h3>
                </div>
                <div className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">Running</div>
              </div>

              <div className="relative h-[360px] overflow-hidden rounded-[1.5rem] border border-slate-700 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.12),_rgba(15,23,42,0.35)_45%,_rgba(15,23,42,0.9)_100%)]">
                <div className="absolute inset-0 opacity-80">
                  <div className="absolute left-0 top-0 h-full w-full bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:28px_28px]" />
                </div>

                <div className="absolute left-10 top-10 h-16 w-16 rounded-xl border-2 border-slate-500 bg-slate-700/80" />
                <div className="absolute left-28 top-20 h-24 w-24 rounded-xl border-2 border-slate-500 bg-slate-700/80" />
                <div className="absolute right-10 top-16 h-20 w-20 rounded-xl border-2 border-slate-500 bg-slate-700/80" />
                <div className="absolute bottom-12 left-20 h-16 w-20 rounded-xl border-2 border-slate-500 bg-slate-700/80" />
                <div className="absolute right-20 bottom-16 h-24 w-24 rounded-xl border-2 border-slate-500 bg-slate-700/80" />

                <div className="absolute bottom-14 left-1/2 flex h-24 w-24 -translate-x-1/2 items-center justify-center rounded-[1.75rem] border-2 border-cyan-300 bg-gradient-to-br from-cyan-400 to-blue-600 shadow-[0_0_40px_rgba(34,211,238,0.45)]">
                  <div className="flex gap-2">
                    <div className="h-9 w-9 rounded-xl bg-slate-900/70" />
                    <div className="h-9 w-9 rounded-xl bg-slate-900/70" />
                  </div>
                </div>

                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-900 to-transparent" />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-100 py-20 dark:bg-slate-950">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Challenges"
              title="Turn skill into mastery through missions"
              description="From beginner tasks to advanced system design, each challenge teaches you how robots behave under constraints and pressure."
            />

            <div className="grid gap-6 lg:grid-cols-3">
              {challengeItems.map((item) => (
                <div key={item.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
                  <div className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ${item.color}`}>
                    {item.level}
                  </div>
                  <h3 className="mt-5 text-2xl font-bold text-slate-900 dark:text-white">{item.title}</h3>
                  <p className="mt-2 text-slate-600 dark:text-slate-300">{item.subtitle}</p>

                  <div className="mt-6 flex items-center justify-between text-sm font-medium text-slate-700 dark:text-slate-200">
                    <span>Open challenge</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Progress system"
            title="See every milestone and level up with confidence"
            description="Track skills, earn achievements, and unlock advanced projects as your robot intelligence grows."
          />

          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Student progress</p>
                  <h3 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">Level 8</h3>
                </div>
                <div className="rounded-full bg-amber-500/10 px-3 py-1 text-sm font-semibold text-amber-600 ring-1 ring-amber-500/30">+12% this month</div>
              </div>

              <div className="space-y-5">
                <div>
                  <div className="mb-2 flex justify-between text-sm text-slate-600 dark:text-slate-300">
                    <span>Core Robotics</span>
                    <span>92%</span>
                  </div>
                  <div className="h-3 rounded-full bg-slate-200 dark:bg-slate-800">
                    <div className="h-3 w-[92%] rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex justify-between text-sm text-slate-600 dark:text-slate-300">
                    <span>Programming</span>
                    <span>84%</span>
                  </div>
                  <div className="h-3 rounded-full bg-slate-200 dark:bg-slate-800">
                    <div className="h-3 w-[84%] rounded-full bg-gradient-to-r from-violet-500 to-indigo-500" />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex justify-between text-sm text-slate-600 dark:text-slate-300">
                    <span>Autonomy</span>
                    <span>68%</span>
                  </div>
                  <div className="h-3 rounded-full bg-slate-200 dark:bg-slate-800">
                    <div className="h-3 w-[68%] rounded-full bg-gradient-to-r from-emerald-500 to-teal-500" />
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-6 text-white shadow-[0_25px_70px_rgba(37,99,235,0.35)]">
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-xl bg-white/15 p-2">
                  <Trophy size={20} />
                </div>
                <span className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">Achievements</span>
              </div>

              <div className="space-y-4">
                {xpSteps.map((step) => (
                  <div key={step} className="flex items-start gap-3 rounded-2xl bg-white/10 p-3 backdrop-blur-sm">
                    <div className="mt-0.5 rounded-full bg-white/15 p-1.5">
                      <Rocket size={14} />
                    </div>
                    <p className="text-blue-50">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-20 dark:bg-slate-900">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Projects"
              title="Build portfolio-ready robot systems"
              description="Turn lessons into standout results with collaborative projects that mirror real engineering workflows and problem-solving."
            />

            <div className="grid gap-6 lg:grid-cols-3">
              {projectCards.map((project) => (
                <div key={project.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-950">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
                    <Layers3 size={22} />
                  </div>
                  <div className="mb-3 inline-flex rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                    {project.tag}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{project.title}</h3>
                  <p className="mt-3 text-slate-600 dark:text-slate-300">{project.description}</p>
                  <button className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400">
                    View project <ArrowRight size={15} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] bg-gradient-to-r from-slate-900 to-blue-950 px-6 py-12 text-center shadow-[0_25px_80px_rgba(15,23,42,0.25)] sm:px-10 lg:px-16">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">Start now</p>
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Launch your robotics journey today</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
              Join a learning environment designed for curious builders, future engineers, and problem solvers ready to create what comes next.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link to="/register" className="btn-primary inline-flex items-center justify-center gap-2">
                Create account
                <ArrowRight size={18} />
              </Link>
              <Link to="/simulator" className="btn-secondary inline-flex items-center justify-center gap-2 border border-slate-600 bg-slate-800 text-white hover:bg-slate-700">
                Explore simulator
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
