import { TypingResult } from '../types';

export const typingStatsInitialState: TypingResult = {
  textId: '',
  cpm: 0,
  wpm: 0,
  accuracy: 100,
  finished: false
};

export * from './auth';
export * from './game';
