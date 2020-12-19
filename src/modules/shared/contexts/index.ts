import { createContext } from 'react';

import { typingStatsInitialState } from '../const';
import { TypingResultContextValue } from '../types';

export const TypingStatsContext = createContext<TypingResultContextValue>({
  state: typingStatsInitialState,
  dispatch: () => undefined
});
