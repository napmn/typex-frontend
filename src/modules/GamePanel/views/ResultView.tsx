import React, { useCallback, useEffect, useRef, useState } from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CheckIcon from '@material-ui/icons/Check';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Person from '@material-ui/icons/Person';
import ReplayIcon from '@material-ui/icons/Replay';
import ShareIcon from '@material-ui/icons/Share';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import pink from '@material-ui/core/colors/pink';

import { Leaderboard } from '../components';
import { useLoaderContext, useLoggedInUser, useTypingStatsContext } from '../../shared/hooks';
import { Result, User } from '../../shared/types';


const useStyles = makeStyles((theme: Theme) => createStyles({
  border: {
    border: '1px solid white',
    padding: '2rem 0',
    justifyContent: 'center',
    textAlign: 'center'
  },
  avatar: {
    color: theme.palette.getContrastText(pink[500]),
    backgroundColor: pink[500],
  },
  playerContainer: {
    display: 'flex',
  },
  inlineBlock: {
    display: 'inline-block'
  }
}));

type ResultViewProps = {
  leaderboard: (Result & Partial<User>)[];
  isFetchedResult: boolean;
}

const ResultView: React.FC<ResultViewProps> = ({
  leaderboard,
  isFetchedResult
}: ResultViewProps) => {
  const classes = useStyles();
  const { state: typingStats, dispatch: typingStatsDispatch } = useTypingStatsContext();
  const { user } = useLoggedInUser();
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ copied, setCopied ] = useState<boolean>(false);
  const loadingTimer = useRef<number>();
  const copiedTimer = useRef<number>();
  const { isLoading } = useLoaderContext();

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
      {isLoading ? null : (
        <Container maxWidth="md">
          {!isFetchedResult && renderDirectResultControls()}
          <Typography variant="h3" align="center" gutterBottom>Your result</Typography>
          <Grid container direction="row">
            <Grid className={`${classes.border} ${classes.playerContainer}`} item xs={6}>
              {user ? <Avatar src={user.photoURL!} /> : <Avatar className={classes.avatar}><Person /></Avatar>}
              <Typography variant="h4">{user?.displayName ?? 'Guest'} </Typography>
            </Grid>
            <Grid className={`${classes.border} ${classes.inlineBlock}`} item xs={2}>
              <div className={classes.inlineBlock}>
                <Typography variant="h4">{typingStats.cpm}</Typography>
              </div>
              <div className={classes.inlineBlock}>
                <Typography variant="subtitle2">cpm</Typography>
              </div>
            </Grid>
            <Grid className={`${classes.border} ${classes.inlineBlock}`} item xs={2}>
              <div className={classes.inlineBlock}>
                <Typography variant="h4">{typingStats.wpm}</Typography>
              </div>
              <div className={classes.inlineBlock}>
                <Typography variant="subtitle2">wpm</Typography>
              </div>
            </Grid>
            <Grid className={`${classes.border} ${classes.inlineBlock}`} item xs={2}>
              <div className={classes.inlineBlock}>
                <Typography variant="h4">{typingStats.accuracy}%</Typography>
              </div>
              <div className={classes.inlineBlock}>
                <Typography variant="subtitle2">accuracy</Typography>
              </div>
            </Grid>
          </Grid>
          <div>
            <Leaderboard data={leaderboard}/>
          </div>
        </Container>
      )}
    </>
  );
};

export default ResultView;
