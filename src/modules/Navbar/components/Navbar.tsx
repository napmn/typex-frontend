import React, { useState } from 'react';
import firebase from 'firebase/app';
import { Link, useHistory } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Keyboard from '@material-ui/icons/Keyboard';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { UsernameDialog } from '../../shared/components';
import { authProviders, gameTypes } from '../../shared/const';
import { useLoggedInUser } from '../../shared/hooks';
import { firebaseService } from '../../shared/services';
import { AuthProvider } from 'modules/shared/types';


const useStyles = makeStyles((theme: Theme) => createStyles({
  navbar: {
    height: '10%'
  },
  toolbar: {
    height: '100%',
    display: 'flex',
  },
  grow: {
    flexGrow: 1
  },
  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3)
  }
}));

const Navbar: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const [ playAnchorEl, setPlayAnchorEl ] = useState<null | HTMLElement>(null);
  const [ singInAnchorEl, setSignInAnchorEl ] = useState<null | HTMLElement>(null);
  const [ profileAnchorEl, setProfileAnchorEl ] = useState<null | HTMLElement>(null);
  const [ usernameDialogOpened, setUsernameDialogOpened ] = useState<boolean>(false);

  const { user, signIn, signOut } = useLoggedInUser();


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

  const handleSignIn = (authProvider: AuthProvider) => {
    setSignInAnchorEl(null);
    signIn(authProvider.provider).then((result: firebase.auth.UserCredential) => {
      if (result.user) {
        if (result.user.displayName) {
          // TODO: success alert
          // user has already set username
          return;
        }
        // store user id to users collection
        firebaseService.saveUser(result.user!.uid, { displayName: result.user.email!, photoURL: result.user.photoURL! });

        // user was registered, let him enter username
        setUsernameDialogOpened(true);
      }
    }).catch(error => {
      // TODO: error alert
      console.error(error);
    });
  };

  const renderLoggedOutpart = () => {
    return (
      <>
        <Button
          onClick={(e: React.MouseEvent<HTMLElement>) => setSignInAnchorEl(e.currentTarget)}
          startIcon={<AccountCircleIcon />}
        >
          Sign In
        </Button>
        <Menu
          anchorEl={singInAnchorEl}
          open={!!singInAnchorEl}
          onClose={() => setSignInAnchorEl(null)}
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
          {authProviders.map((authProvider, i) => (
            <MenuItem
              key={i}
              onClick={() => handleSignIn(authProvider)}
            >
              {authProvider.name}
            </MenuItem>
          ))}
        </Menu>
      </>
    );
  };

  const renderLoggedInPart = () => {
    return (
      <>
        <Button
          onClick={(e: React.MouseEvent<HTMLElement>) => setProfileAnchorEl(e.currentTarget)}
          // TODO: default icon??
          endIcon={
            <Avatar
              className={classes.avatar}
              alt={user?.displayName || "avatar"}
              src={user?.photoURL || ""}
            />
          }
        >
          {user?.displayName || user?.email}
        </Button>
        <Menu
          anchorEl={profileAnchorEl}
          open={!!profileAnchorEl}
          onClose={() => setProfileAnchorEl(null)}
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
          <MenuItem
            onClick={() => {
              setProfileAnchorEl(null);
              setUsernameDialogOpened(true);
            }}
          >
            Change Username
          </MenuItem>
          <MenuItem
            onClick={() => {
              setProfileAnchorEl(null);
              signOut();
              history.push('/');
            }}
          >
            Sign Out
          </MenuItem>
        </Menu>
      </>
    );
  };

  return (
    <>
      <AppBar className={classes.navbar} position="static">
        <Toolbar className={classes.toolbar}>
          <div>
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
          </div>
          <div className={classes.grow} />
          {user ? renderLoggedInPart() : renderLoggedOutpart()}
          {/* {user ? renderLoggedInPart() : renderLoggedOutpart()} */}
        </Toolbar>
      </AppBar>
      <UsernameDialog
        open={usernameDialogOpened}
        onClose={() => setUsernameDialogOpened(false)}
      />

    </>
  );
};

export default Navbar;
