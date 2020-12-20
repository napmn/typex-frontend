import React from 'react';
// import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    minHeight: '250px'
  },
  text: {
    fontSize: '24px'
  }
});

interface TextBoardProps {
  finishedTokens: Array<string>;
  activeToken: string;
  activeLetterIndex: number;
  remainingTokens: Array<string>;
  errorIndex: number;
}

const TextBoard: React.FC<TextBoardProps> = ({
  finishedTokens,
  activeToken,
  activeLetterIndex,
  remainingTokens,
  errorIndex
}: TextBoardProps) => { // TODO: check this, why do I need to specify type again?
  const classes = useStyles();

  let finishedPart;
  let unfinishedPart;
  let erroredPart = '';
  if (errorIndex !== -1) {
    finishedPart = activeToken.substring(0, errorIndex);
    erroredPart = activeToken.substring(errorIndex, activeLetterIndex);
    unfinishedPart = activeToken.substring(activeLetterIndex);
  } else {
    finishedPart = activeToken.substring(0, activeLetterIndex);
    unfinishedPart = activeToken.substring(activeLetterIndex);
  }

  return (
    <div className={classes.card}>
      <Typography className={classes.text} component="span">{finishedTokens.join('')}</Typography>
      <Typography className={classes.text} component="span">{finishedPart}</Typography>
      <Typography className={classes.text} component="span" color="error">{erroredPart}</Typography>
      <Typography className={classes.text} component="span" color="primary">{unfinishedPart}</Typography>
      <Typography className={classes.text} component="span" color="textSecondary">{remainingTokens.join('')}</Typography>
    </div>
  );
};

export default TextBoard;
