import React from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';

import { TGameType } from '../../shared/types';

const useStyles = makeStyles({
  card: {
    minHeight: '200px',
    minWidth: '50px'
  }
});

type GameTypeCardProps = {
  gameType: TGameType
}

const GameTypeCard: React.FC<GameTypeCardProps> = ({
  gameType
}: GameTypeCardProps) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>{gameType.verboseName}</Card>
  );
};

export default GameTypeCard;
