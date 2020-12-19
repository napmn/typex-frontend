import React, { useState } from 'react';

import { GameType } from '../../shared/types';
import GamePanelView from './GamePanelView';
import ResultView from './ResultView';
import { useTypingStatsReducer } from '../../shared/hooks';
import { TypingStatsContext } from '../../shared/contexts';

type GameViewProps = {
  gameType: GameType;
}

const GameView: React.FC<GameViewProps> = ({
  gameType
}: GameViewProps) => {
  const [ isFinished, setIsFinished ] = useState<boolean>(false);
  const [ typingStats, typingStatsDispatch ] = useTypingStatsReducer();

  const handleFinish = () => {
    setIsFinished(true);
  };

  return (
    <TypingStatsContext.Provider value={{ state: typingStats, dispatch: typingStatsDispatch }}>
      {isFinished ?
        <ResultView /> :
        <GamePanelView
          gameType={gameType}
          onFinish={handleFinish}
        />
      }
    </TypingStatsContext.Provider>
  );
};

export default GameView;
