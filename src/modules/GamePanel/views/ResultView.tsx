import React, { useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';

import { useTypingStatsContext } from '../../shared/hooks';

const ResultView: React.FC = () => {
  const { resultId } = useParams<{ resultId: string | undefined}>();

  const { state: typingState } = useTypingStatsContext();

  useEffect(() => {
    if (typingState.textId !== '') {
      const { textId } = typingState;
      console.log('TeXT ID IS', textId);
    } else {
      // using the ID of result
      console.log('NEED TO FETCH');
    }
  }, []);

  if (!resultId && typingState.textId === '') {
    return <Redirect to="/" />;
  }

  return (
    <>
      <div>result</div>
      <div>
        <div>leaderboard</div>
      </div>
    </>
  );
};

export default ResultView;
