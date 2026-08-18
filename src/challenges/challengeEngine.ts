export type ChallengeDifficulty = 'beginner' | 'intermediate' | 'advanced';
export type ChallengeStatus = 'SUCCESS' | 'FAILED';

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
    timeLimit: 18,
    maxScore: 100,
  },
];

export const evaluateChallenge = (challenge: ChallengeModel, input: ChallengeCheckInputs): ChallengeResult => {
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

  const finalScore = Math.min(challenge.maxScore, Math.max(0, Math.round(scoreBase - timeBonus + sensorBonus)));

  return {
    status: 'SUCCESS',
    score: finalScore,
    message: 'Challenge completed successfully.',
  };
};
