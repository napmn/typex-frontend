import React from 'react';
import { useHistory } from 'react-router-dom';
import ButtonBase from '@material-ui/core/ButtonBase';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { GameType } from '../../shared/types';

const useStyles = makeStyles({
  card: {
    height: '220px',
    minWidth: '50px'
  },
  heading: {
  },
  cardAction: {
    display: 'block',
    height: '100%',
    width: '100%'
  },
  cardContent: {
    height: '100%'
  }
});

type GameTypeCardProps = {
  gameType: GameType
}

const GameTypeCard: React.FC<GameTypeCardProps> = ({
  gameType
}: GameTypeCardProps) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Card className={classes.card} style={{ border: `1px solid ${gameType.color}`}}>
      <ButtonBase
        className={classes.cardAction}
        onClick={() => history.push(gameType.path)}
      >
        <CardContent className={classes.cardContent}>
          <Typography variant="h4" style={{ color: gameType.color }} gutterBottom>
            {gameType.verboseName}
          </Typography>
          <Typography variant="body2" component="p" color="textSecondary">
            {gameType.about}
          </Typography>
        </CardContent>
      </ButtonBase>
    </Card>
  );
};

export default GameTypeCard;
