import React, { useState } from 'react';
import firebase from 'firebase/app';
import { useHistory } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import IconButton from '@material-ui/core/IconButton';
import Keyboard from '@material-ui/icons/Keyboard';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
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
    height: '10%',
    boxShadow: 'none'
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
          startIcon={<AccountCircleIcon fontSize="large" />}
          size="large"
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
              <ListItemIcon>
                {authProvider.icon}
              </ListItemIcon>
              <ListItemText>{authProvider.name}</ListItemText>
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
            horizontal: 'left',
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
            <ListItemIcon>
              <EditIcon/>
            </ListItemIcon>
            <ListItemText>Change Username</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => {
              setProfileAnchorEl(null);
              signOut();
              history.push('/');
            }}
          >
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText>Sign Out</ListItemText>
          </MenuItem>
        </Menu>
      </>
    );
  };

  return (
    <>
      <AppBar
        className={classes.navbar}
        position="static"
        color="transparent"
      >
        <Toolbar className={classes.toolbar}>
          <div>
            <IconButton
              onClick={() => history.push('/')}
            >
              <HomeIcon fontSize="large"/>
            </IconButton>
            <IconButton
              onClick={handlePlayMenu}
            >
              <Keyboard fontSize="large" />
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
                  disabled={gameType.disabled}
                  key={i}
                  onClick={() => handlePlaySelection(gameType.path)}
                >
                  <ListItemIcon>
                    {gameType.icon}
                  </ListItemIcon>
                  <ListItemText>{gameType.verboseName}</ListItemText>
                </MenuItem>
              ))}
              {/* TODO: icons and more options */}
            </Menu>
          </div>
          <div className={classes.grow} />
          {user ? renderLoggedInPart() : renderLoggedOutpart()}
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
