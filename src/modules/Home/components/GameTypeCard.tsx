import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';

import { GameType } from '../../shared/types';

const useStyles = makeStyles({
  card: {
    minHeight: '200px',
    minWidth: '50px'
  }
});

type GameTypeCardProps = {
  gameType: GameType
}

const GameTypeCard: React.FC<GameTypeCardProps> = ({
  gameType
}: GameTypeCardProps) => {
  const classes = useStyles();

  return (
    <Link to={gameType.path}>
      <Card
        className={classes.card}
      >
        {gameType.verboseName}
      </Card>
    </Link>
  );
};

export default GameTypeCard;
