import React, { useCallback, useEffect, useRef, useState } from 'react';

import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';
import IconButton from '@material-ui/core/IconButton';
import ReplayIcon from '@material-ui/icons/Replay';
import ShareIcon from '@material-ui/icons/Share';

import { useLoggedInUser, useTypingStatsContext } from '../../shared/hooks';
import { Result, User } from '../../shared/types';

type ResultViewProps = {
  leaderboard: (Result & Partial<User>)[];
  isFetchedResult: boolean;
}

const ResultView: React.FC<ResultViewProps> = ({
  leaderboard,
  isFetchedResult
}: ResultViewProps) => {
  const { state: typingStats, dispatch: typingStatsDispatch } = useTypingStatsContext();
  const { user } = useLoggedInUser();
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ copied, setCopied ] = useState<boolean>(false);
  const loadingTimer = useRef<number>();
  const copiedTimer = useRef<number>();

  useEffect(() => {
    return () => {
      clearTimeout(loadingTimer.current);
      clearTimeout(copiedTimer.current);
    };
  }, []);

  useEffect(() => {
    if (copied) {
      copiedTimer.current = window.setTimeout(() => setCopied(false), 2500);
    }
  }, [copied]);

  const copyToClipboard = useCallback(() => {
    if (copied) return;
    setLoading(true);

    loadingTimer.current = window.setTimeout(() => {
      navigator.clipboard.writeText(`${window.location.origin}/result/${typingStats.resultId}`).then(() => {
        setCopied(true);
        setLoading(false);
      });
    }, 1000);
  }, [typingStats.resultId]);

  const renderDirectResultControls = () => {
    return (
      <div>
        <IconButton
          onClick={() => {
            typingStatsDispatch({ type: 'reset' });
          }}
        >
          <ReplayIcon />
        </IconButton>
        { user && (
          <Button
            onClick={copyToClipboard}
            disabled={loading}
            startIcon={copied ? <CheckIcon /> : <ShareIcon />}
          >
            {copied ? <span>COPIED to clipboard</span> : <span>share</span>}
          </Button>
        )}
      </div>
    );
  };

  return (
    <>
      {!isFetchedResult && renderDirectResultControls()}
      <div>result</div>
      <div>{typingStats.resultId}</div>
      <div>{typingStats.cpm}</div>
      <div>{typingStats.wpm}</div>
      <div>{typingStats.accuracy}</div>
      <div>
        <div>leaderboard</div>
        {leaderboard.map((row, i) => (
          <div key={i} style={{marginTop: '20px'}}>
            <div>{row.cpm}</div>
            <div>{row.accuracy}</div>
            <div>{row.timestamp.toDate().toString()}</div>
            <div>{row.displayName}</div>
            <div>{row.photoURL}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ResultView;
