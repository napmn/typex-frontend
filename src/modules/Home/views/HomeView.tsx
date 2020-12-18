import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';

import { gameTypes } from '../../shared/const';
import { GameTypeCard } from '../components';


const useStyles = makeStyles({
  root: {
    height: '90%'
  },
  card: {
    flexBasis: '20%'
  }
});

const HomeView: React.FC = () => {
  const classes = useStyles();

  return (
    <Grid className={classes.root} container direction="row" alignItems="center" justify="center" spacing={3}>
      {gameTypes.map((gameType) => (
        <Grid className={classes.card} key={gameType.name} item>
          <GameTypeCard gameType={gameType}/>
        </Grid>
      ))}
    </Grid>
  );
};

export default HomeView;
