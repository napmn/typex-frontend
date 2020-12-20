import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';

import { TextBoard, TypingInput } from '../components';
import { GameType } from '../../shared/types';
import { firebaseService } from '../../shared/services';
import { useLoaderContext, useTypingStatsContext } from '../../shared/hooks';

const useStyles = makeStyles({
  container: {
    height: '70%',
    marginTop: '50px'
  },
  author: {
    fontStyle: 'italic'
  },
  statsContainer: {
    marginTop: '30px'
  },
  stats: {
    fontWeight: 'bolder'
  }
});

type GamePanelViewProps = {
  gameType: GameType;
}

const GamePanelView: React.FC<GamePanelViewProps> = ({
  gameType
}: GamePanelViewProps) => {
  const classes = useStyles();

  // Hooks for text partitioning
  const [ text, setText ] = useState<string>();
  const [ author, setAuthor ] = useState<string>();
  const [ activeToken, setActiveToken ] = useState<string>('');
  const [ finishedTokens, setFinishedTokens ] = useState<Array<string>>([]);
  const [ activeLetterIndex, setActiveLetterIndex ] = useState<number>(0);
  const [ remainingTokens, setRemainingTokens ] = useState<Array<string>>([]);

  // Errors hooks
  const [ errorIndex, setErrorIndex ] = useState<number>(-1);
  const [ errorsNumber, setErrorsNumber ] = useState<number>(0);

  // Stats hooks
  const [ typedCharactersNumber, setTypedCharactersNumber ] = useState<number>(0);
  const [ typingStartTime, setTypingStartTime ] = useState<Date>();

  const { state: typingStats, dispatch: typingStatsDispatch } = useTypingStatsContext();
  const { isLoading, setIsLoading } = useLoaderContext();

  useEffect(() => {
    setIsLoading(true);
    typingStatsDispatch({type: 'reset'});
    // load random text base on game type
    firebaseService.getTextByGameVariation(gameType.name).then((data) => {
      typingStatsDispatch({ type: 'update', payload: { textId: data.id } });
      setText(data.content);
      setAuthor(data.author);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    // set up tokens on text change
    if (!text) return;
    let tokens = text.replace(/\s+/g, ' ').trim().split(' ');
    tokens = tokens.map(
      (token, index) => index === tokens.length - 1 ? token : `${token} `
    );
    setActiveToken(tokens[0]);
    tokens.splice(0, 1);
    setRemainingTokens(tokens);
  }, [text]);

  useEffect(() => {
    setActiveLetterIndex(0);
  }, [activeToken]);

  useEffect(() => {
    typingStatsDispatch({
      type: 'update',
      payload: {
        cpm: calculateCpm(),
        accuracy: calculateAccuracy()
      }
    });
    if (typedCharactersNumber === text?.length) {
      // typing finished -> calculate final stats
      typingStatsDispatch({ type: 'finalize' });
    }
  }, [typedCharactersNumber]);

  useEffect(() => {
    // start counting the typing time after first keystroke
    if (finishedTokens.length === 0 && activeLetterIndex === 1) {
      setTypingStartTime(t => t ? t: new Date()); // correctly handles error on first keystroke
    }
  }, [activeLetterIndex, finishedTokens]);

  useEffect(() => {
    if (errorIndex !== -1) {
      // error was made -> increasing counter
      setErrorsNumber(n => n + 1);
    }
  }, [errorIndex]);

  const calculateCpm = (): number => {
    if (!typingStartTime) return 0;
    const now = new Date();
    const res = now.getTime() - typingStartTime.getTime();
    return typedCharactersNumber / (res / 1000 / 60);
  };

  const calculateAccuracy = (): number => {
    if (!typingStartTime) return 100;
    return (text!.length - errorsNumber) / text!.length * 100;
  };

  const jumpToNextWord = () => {
    // move one word forward
    setFinishedTokens(tokens => {
      return [...tokens, activeToken];
    });
    setRemainingTokens(tokens => {
      return tokens.slice(1);
    });
    setTypedCharactersNumber(n => n + activeToken.length);
    setActiveToken(remainingTokens.length > 0 ? remainingTokens[0] : "");
  };

  return (
    <>
      {isLoading ? null : (
        <Container className={classes.container} maxWidth="md">
          <TextBoard
            finishedTokens={finishedTokens}
            activeToken={activeToken}
            activeLetterIndex={activeLetterIndex}
            remainingTokens={remainingTokens}
            errorIndex={errorIndex}
          />
          <Typography
            className={classes.author}
            variant="h6"
            color="textSecondary"
            align="right"
          >
            Author: {author}
          </Typography>
          <TypingInput
            activeToken={activeToken}
            setActiveLetterIndex={setActiveLetterIndex}
            jumpToNextWord={jumpToNextWord}
            errorIndex={errorIndex}
            setErrorIndex={setErrorIndex}
          />
          <Grid className={classes.statsContainer} container>
            <Grid item xs={4}>
              <Typography className={classes.stats} variant="subtitle1" align="center" color="textSecondary">
                CPM: {typingStats.cpm.toFixed(0)}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography className={classes.stats} variant="subtitle1" align="center" color="textSecondary">
                WPM: {(typingStats.cpm / 5).toFixed(0)}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography className={classes.stats} variant="subtitle1" align="center" color="textSecondary">
                Accuracy: {typingStats.accuracy.toFixed(2)}%
              </Typography>
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
};

export default GamePanelView;
