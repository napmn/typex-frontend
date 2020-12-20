import React from 'react';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';

import { gameTypes } from '../../shared/const';
import { GameTypeCard } from '../components';


const useStyles = makeStyles({
  root: {
    height: '70%',
    marginTop: '50px'
  },
  card: {
    flexBasis: '30%'
  },
  grid: {
    marginTop: '70px'
  }
});

const HomeView: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <Container className={classes.root} maxWidth="md">
        <Typography variant="h4" align="center" gutterBottom>
        Welcome to our typing speed test website! You can practice, compete and share your results with friends.
        But don&apos;t forget to sign in our otherwise your scores will not be saved into our database.
        </Typography>
        <Typography variant="h3" align="center">Have fun!</Typography>
        <Grid container className={classes.grid} direction="row" alignItems="center" justify="center" spacing={3}>
          <Grid item xs={12}>
            <Typography variant="subtitle1" align="center" color="textSecondary">Start by selecting a mode you want to play</Typography>
          </Grid>
          {gameTypes.map((gameType) => (
            <Grid className={classes.card} key={gameType.name} item>
              <GameTypeCard gameType={gameType}/>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default HomeView;
