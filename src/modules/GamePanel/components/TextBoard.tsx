import React from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    minHeight: '200px'
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

  console.log(errorIndex);
  // TODO: optimize this later
  const finishedPart = activeToken.substring(0, activeLetterIndex);
  const unfinishedPart = activeToken.substring(activeLetterIndex);

  // TODO: optimize rerenders?
  return (
    <Card className={classes.card}>
      <Typography component="span" color="secondary">{finishedTokens.join('')}</Typography>
      <Typography component="span" color="secondary">{finishedPart}</Typography>
      <Typography component="span" color="primary">{unfinishedPart}</Typography>
      <Typography component="span">{remainingTokens.join('')}</Typography>
    </Card>
  );
};

export default TextBoard;
