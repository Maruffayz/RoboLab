export type ChallengeDifficulty = 'beginner' | 'intermediate' | 'advanced';
export type ChallengeStatus = 'SUCCESS' | 'FAILED';

export interface ChallengeHint {
  id: string;
  text: string;
  level: number; // 1, 2, 3...
  penalty: number; // score reduction when this hint is used (e.g., 10)
}

export interface ChallengeModel {
  id: string;
  title: string;
  description: string;
  difficulty: ChallengeDifficulty;
  environment: string;
  initialRobotState: {
    position: [number, number, number];
    rotation: number;
    velocity: number;
    leftMotorSpeed: number;
    rightMotorSpeed: number;
  };
  goal: string;
  rules: string[];
  hints: ChallengeHint[];
  timeLimit: number;
  maxScore: number;
}

export interface ChallengeCheckInputs {
  targetReached: boolean;
  collision: boolean;
  time: number;
  requiredSensor?: string;
  robotState: {
    position: [number, number, number];
    rotation: number;
    velocity: number;
    leftMotorSpeed: number;
    rightMotorSpeed: number;
  };
}

export interface ChallengeResult {
  status: ChallengeStatus;
  score: number;
  message: string;
  hintPenalty?: number;
}

export const challengeCatalog: ChallengeModel[] = [
  {
    id: 'safe-navigation',
    title: 'Safe corridor navigation',
    description: 'Robot devorga urilmasdan finishga yetishi kerak.',
    difficulty: 'intermediate',
    environment: 'narrow corridor with one obstacle and a finish line',
    initialRobotState: {
      position: [0, 0.4, 0],
      rotation: 0,
      velocity: 0,
      leftMotorSpeed: 0,
      rightMotorSpeed: 0,
    },
    goal: 'Reach the finish zone without colliding with the wall.',
    rules: [
      'Avoid any obstacle collision.',
      'Use the ultrasonic sensor to detect proximity.',
      'Finish within the time limit.',
    ],
    hints: [
      {
        id: 'nav-hint-1',
        text: 'Obstaclegacha bo\'lgan masofani o\'lchab ko\'r.',
        level: 1,
        penalty: 5,
      },
      {
        id: 'nav-hint-2',
        text: 'Ultrasonic sensor qiymatini tekshir.',
        level: 2,
        penalty: 8,
      },
      {
        id: 'nav-hint-3',
        text: 'distance < 20 bo\'lsa robotni to\'xtat.',
        level: 3,
        penalty: 10,
      },
    ],
    timeLimit: 25,
    maxScore: 100,
  },
  {
    id: 'precision-turn',
    title: 'Precision turn challenge',
    description: 'Robot aniq burchakdan burilib, maqsadga yetishi kerak.',
    difficulty: 'beginner',
    environment: 'open arena with a marked turn target',
    initialRobotState: {
      position: [0, 0.4, 0],
      rotation: 0,
      velocity: 0,
      leftMotorSpeed: 0,
      rightMotorSpeed: 0,
    },
    goal: 'Turn exactly 90 degrees and continue to the target.',
    rules: [
      'No wall contact.',
      'Turn angle must be within 10 degrees of target.',
    ],
    hints: [
      {
        id: 'turn-hint-1',
        text: 'Robotning rotatsiyasini kuzat.',
        level: 1,
        penalty: 5,
      },
      {
        id: 'turn-hint-2',
        text: '90 gradusni qanday hisoblashtiring? Aylana 360 gradus.',
        level: 2,
        penalty: 8,
      },
      {
        id: 'turn-hint-3',
        text: 'Ikkala motorni qarama-qarshi yo\'nalishda ishlatish kerak.',
        level: 3,
        penalty: 10,
      },
    ],
    timeLimit: 18,
    maxScore: 100,
  },
];

export const evaluateChallenge = (challenge: ChallengeModel, input: ChallengeCheckInputs, usedHints: number[] = []): ChallengeResult => {
  if (input.collision) {
    return {
      status: 'FAILED',
      score: 0,
      message: 'Collision detected. The robot hit an obstacle.',
    };
  }

  if (input.time > challenge.timeLimit) {
    return {
      status: 'FAILED',
      score: 0,
      message: 'Time limit exceeded.',
    };
  }

  if (!input.targetReached) {
    return {
      status: 'FAILED',
      score: 25,
      message: 'Objective not reached yet.',
    };
  }

  const scoreBase = challenge.maxScore;
  const timeBonus = Math.max(0, (challenge.timeLimit - input.time) / challenge.timeLimit) * 25;
  const sensorBonus = input.requiredSensor ? 15 : 0;

  // Calculate hint penalty
  const hintPenalty = usedHints.reduce((total, hintLevel) => {
    const hint = challenge.hints.find((h) => h.level === hintLevel);
    return total + (hint?.penalty || 0);
  }, 0);

  const finalScore = Math.min(challenge.maxScore, Math.max(0, Math.round(scoreBase - timeBonus + sensorBonus - hintPenalty)));

  return {
    status: 'SUCCESS',
    score: finalScore,
    message: 'Challenge completed successfully.',
  };
};
