import { useState } from 'react';
import { challengeCatalog, evaluateChallenge, type ChallengeModel } from '../challenges/challengeEngine';

interface ChallengePanelProps {
  challenge?: ChallengeModel;
}

const challengeExamples = challengeCatalog;

export const ChallengePanel = ({ challenge = challengeExamples[0] }: ChallengePanelProps) => {
  const [usedHints, setUsedHints] = useState<number[]>([]);
  const [hintsExpanded, setHintsExpanded] = useState(false);

  const evaluation = evaluateChallenge(
    challenge,
    {
      targetReached: true,
      collision: false,
      time: 12,
      requiredSensor: 'ultrasonic',
      robotState: challenge.initialRobotState,
    },
    usedHints,
  );

  const toggleHint = (level: number) => {
    setUsedHints((prev) => (prev.includes(level) ? prev.filter((h) => h !== level) : [...prev].sort().concat(level).sort()));
  };

  const totalHintPenalty = usedHints.reduce((total, hintLevel) => {
    const hint = challenge.hints.find((h) => h.level === hintLevel);
    return total + (hint?.penalty || 0);
  }, 0);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-600 dark:text-violet-400">Challenge</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{challenge.title}</h2>
        </div>

        <div className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-violet-700 dark:border-violet-900 dark:bg-violet-950/40 dark:text-violet-300">
          {challenge.difficulty}
        </div>
      </div>

      <p className="mt-5 text-lg text-slate-700 dark:text-slate-200">{challenge.description}</p>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950/60">
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Goal</h3>
          <p className="mt-3 text-slate-700 dark:text-slate-200">{challenge.goal}</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950/60">
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Environment</h3>
          <p className="mt-3 text-slate-700 dark:text-slate-200">{challenge.environment}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950/60">
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Rules</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-200">
            {challenge.rules.map((rule) => (
              <li key={rule} className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-violet-500" />
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950/60">
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Challenge summary</h3>
          <div className="mt-3 space-y-3 text-sm text-slate-700 dark:text-slate-200">
            <div className="flex items-center justify-between"><span>Time limit</span><strong>{challenge.timeLimit}s</strong></div>
            <div className="flex items-center justify-between"><span>Max score</span><strong>{challenge.maxScore}</strong></div>
            <div className="flex items-center justify-between"><span>Required sensor</span><strong>{challenge.rules.some((rule) => rule.toLowerCase().includes('sensor')) ? 'Ultrasonic' : 'N/A'}</strong></div>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950/30">
        <button
          onClick={() => setHintsExpanded(!hintsExpanded)}
          className="flex w-full items-center justify-between gap-3 text-left"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-300">Hints</p>
            <p className="mt-1 text-sm text-amber-800 dark:text-amber-100">
              {usedHints.length > 0 ? `${usedHints.length} hint(s) used` : 'Click to reveal progressive hints'}
            </p>
          </div>
          <div className="text-amber-700 dark:text-amber-300">{hintsExpanded ? '▼' : '▶'}</div>
        </button>

        {hintsExpanded && (
          <div className="mt-4 space-y-3">
            {challenge.hints.map((hint) => (
              <button
                key={hint.id}
                onClick={() => toggleHint(hint.level)}
                className={`w-full rounded-lg border-2 p-3 text-left transition-all ${
                  usedHints.includes(hint.level)
                    ? 'border-amber-400 bg-amber-100 dark:border-amber-600 dark:bg-amber-900/40'
                    : 'border-amber-200 bg-white dark:border-amber-900 dark:bg-slate-950'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-amber-700 dark:text-amber-300">
                      Hint {hint.level}
                    </p>
                    <p className="mt-1 text-sm text-slate-700 dark:text-slate-200">{hint.text}</p>
                  </div>
                  <div className="text-xs font-medium text-amber-600 dark:text-amber-400">
                    {usedHints.includes(hint.level) ? `✓ -${hint.penalty}` : `-${hint.penalty}`}
                  </div>
                </div>
              </button>
            ))}
            {totalHintPenalty > 0 && (
              <div className="rounded-lg bg-amber-100 p-2 text-center text-xs font-semibold text-amber-800 dark:bg-amber-900/40 dark:text-amber-200">
                Total hint penalty: -{totalHintPenalty}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900 dark:bg-emerald-950/30">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">Result</p>
            <p className="mt-1 text-2xl font-bold text-emerald-700 dark:text-emerald-300">{evaluation.status}</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Score</p>
            <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{evaluation.score}/100</p>
          </div>
        </div>
        <p className="mt-3 text-sm text-emerald-800 dark:text-emerald-100">{evaluation.message}</p>
      </div>
    </div>
  );
};
