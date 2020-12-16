import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

import { GamePanelView } from './modules/GamePanel';

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



function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        {/* TODO: router */}
        <GamePanelView />
      </div>
    </MuiThemeProvider>
  );
}

export default App;
