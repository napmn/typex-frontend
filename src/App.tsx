import React, { useState } from 'react';
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch
} from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

import cyan from '@material-ui/core/colors/cyan';
import { makeStyles } from '@material-ui/core/styles';

import { GameView } from './modules/GamePanel';
import { HomeView } from './modules/Home';
import { Navbar } from './modules/Navbar';
import { gameTypes } from './modules/shared/const';
import { LoaderContext } from './modules/shared/contexts';
import { LoadingWrapper } from './modules/shared/components';

const theme = createMuiTheme({
  palette: {
    primary: {
      // main: deepOrange[500],
      main: cyan[400]
    },
    type: 'dark',
    background: {
      default: '#121520',
      paper: '#212735'
    }
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
  const [ isLoading, setIsLoading ] = useState<boolean>(false);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <main className="App">
        <LoaderContext.Provider value={{ isLoading, setIsLoading }}>
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
                    render={() => (
                      <LoadingWrapper>
                        <GameView gameType={gameType} />
                      </LoadingWrapper>
                    )}
                  />
                ))}
                <Route exact path="/result/:resultId" render={() => (
                  <LoadingWrapper>
                    <GameView />
                  </LoadingWrapper>
                )} />
                <Redirect to="/" />
              </Switch>
            </Router>
          </Container>
        </LoaderContext.Provider>
      </main>
    </MuiThemeProvider>
  );
}

export default App;
