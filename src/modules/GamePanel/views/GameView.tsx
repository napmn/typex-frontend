import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import firebase from 'firebase/app';

import { GameType } from '../../shared/types';
import GamePanelView from './GamePanelView';
import ResultView from './ResultView';
import { useLoaderContext, useLoggedInUser, useTypingStatsReducer } from '../../shared/hooks';
import { TypingStatsContext } from '../../shared/contexts';
import { firebaseService } from 'modules/shared/services';
import { Result, User } from '../../shared/types';

type GameViewProps = {
  gameType?: GameType;
}

const GameView: React.FC<GameViewProps> = ({
  gameType
}: GameViewProps) => {
  const history = useHistory();
  const [ typingStats, typingStatsDispatch ] = useTypingStatsReducer();
  const [ leaderboard, setLeaderboard ] = useState<(Result & Partial<User>)[]>([]);
  const { user } = useLoggedInUser();
  const [ resultUser, setResultUser ] = useState<User>();
  const { resultId } = useParams<{ resultId: string | undefined }>();
  const { setIsLoading } = useLoaderContext();

  useEffect(() => {
    if (resultId) {
      // load leaderboard
      setIsLoading(true);
      firebaseService.getResult(resultId!).then(result => {
        if (result) {
          loadResultUser(result.userId);
          typingStatsDispatch({
            type: 'update',
            payload: {
              accuracy: result.accuracy,
              cpm: result.cpm,
              wpm: result.wpm,
              textId: result.textId
            }
          });
          // leaderboard will be loaded in effect
        }
      }).catch((err) => {
        console.error(err);
        setIsLoading(false);
        history.push('/');
      });
    }
  }, []);

  const loadResultUser = (userId: string) => {
    firebaseService.getUser(userId).then((user) => {
      setResultUser(user);
    });
  };

  useEffect(() => {
    if (typingStats.finished) {
      if (user) {
        const newResult = {
          ...typingStats,
          userId: user.uid,
          timestamp: firebase.firestore.Timestamp.fromDate(new Date())
        };
        loadResultUser(user.uid);
        updateLeaderboard({ ...newResult, displayName: user.displayName ?? '', photoURL: user.photoURL ?? '' });
        firebaseService.saveResult(newResult).then(newResultId => {
          typingStatsDispatch({type: 'update', payload: { resultId: newResultId } });
        }).catch(err => {
          console.error(err);
        });
      }
    }
  }, [typingStats.finished, user]);

  useEffect(() => {
    // load leaderboard as soon as we have text id
    if (typingStats.textId !== '') {
      firebaseService.getLeaderboardForText(typingStats.textId).then(
        res => setLeaderboard(res)
      ).finally(() => setIsLoading(false));
    }
  }, [typingStats.textId]);

  const updateLeaderboard = (newResult: Result & User) => {
    const position = leaderboard.findIndex(r => r.cpm < typingStats.cpm);
    // TODO simplify this logic
    if (leaderboard!.length < 10 && position === -1) {
      // object with lower score was not found but leaderboard is not complete -> append new result
      const updatedLeaderboard = leaderboard.slice();
      updatedLeaderboard.push(newResult);
      setLeaderboard(updatedLeaderboard);
    } else if (position !== -1) {
      const updatedLeaderboard = leaderboard.slice();
      if (leaderboard.length < 10) {
        // insert
        updatedLeaderboard.splice(position, 0, newResult);
      } else {
        // update
        updatedLeaderboard[position] = newResult;
      }
      setLeaderboard(updatedLeaderboard);
    }
  };

  return (
    <TypingStatsContext.Provider value={{ state: typingStats, dispatch: typingStatsDispatch }}>
      {typingStats.finished || resultId ?
        <ResultView
          resultUser={resultUser}
          leaderboard={leaderboard}
          isFetchedResult={!!resultId}
        /> :
        <GamePanelView
          gameType={gameType!}
        />
      }
    </TypingStatsContext.Provider>
  );
};

export default GameView;
