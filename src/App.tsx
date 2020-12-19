import React from 'react';
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch
} from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

import green from '@material-ui/core/colors/green';
import purple from '@material-ui/core/colors/purple';
import { makeStyles } from '@material-ui/core/styles';

import { GamePanelView } from './modules/GamePanel';
import { HomeView } from './modules/Home';
import { LeaderBoardView } from './modules/LeaderBoard';
import { Navbar } from './modules/Navbar';
import { gameTypes } from 'modules/shared/const';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  },
});

const useStyles = makeStyles({
  mainContainer: {
    paddingTop: '2rem',
    height: '100%'
  }
});


function App() {
  const classes = useStyles();

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <main className="App">
        <Container maxWidth="lg" className={classes.mainContainer}>
          <Router>
            <Navbar />
            <Switch>
              <Route exact path="/" component={HomeView} />
              {gameTypes.map((gameType, i) => (
                <Route
                  key={i}
                  exact
                  path={gameType.path}
                  render={() => <GamePanelView gameType={gameType} />}
                />
              ))}
              <Route exact path="/leaderboard" component={LeaderBoardView} />
              <Redirect to="/" />
            </Switch>
          </Router>
        </Container>
      </main>
    </MuiThemeProvider>
  );
}

export default App;
