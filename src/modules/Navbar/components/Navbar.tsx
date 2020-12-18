import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Keyboard from '@material-ui/icons/Keyboard';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core';

import { gameTypes } from '../../shared/const';

const useStyles = makeStyles({
  navbar: {
    height: '10%'
  },
  toolbar: {
    height: '100%'
  }
});

const Navbar: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const [playAnchorEl, setPlayAnchorEl] = useState<null | HTMLElement>(null);

  const handlePlayMenu = (event: React.MouseEvent<HTMLElement>) => {
    setPlayAnchorEl(event.currentTarget);
  };

  const handlePlayClose = () => {
    setPlayAnchorEl(null);
  };

  const handlePlaySelection = (path: string) => {
    setPlayAnchorEl(null);
    history.push(path);
  };

  return (
    <AppBar className={classes.navbar} position="static">
      <Toolbar className={classes.toolbar}>
        <Link to="/">
          <Button>Home</Button>
        </Link>
        <IconButton
          onClick={handlePlayMenu}
        >
          <Keyboard />
        </IconButton>
        <Menu
          anchorEl={playAnchorEl}
          open={!!playAnchorEl}
          onClose={handlePlayClose}
          keepMounted
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          {gameTypes.map((gameType, i) => (
            <MenuItem
              key={i}
              onClick={() => handlePlaySelection(gameType.path)}
            >
              {gameType.verboseName}
            </MenuItem>
          ))}
          {/* TODO: icons and more options */}
        </Menu>

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
