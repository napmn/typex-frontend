import React from 'react';
import firebase from 'firebase/app';
import GitHubIcon from '@material-ui/icons/GitHub';

import { AuthProvider } from '../types';

const githubProvider = new firebase.auth.GithubAuthProvider();

export const authProviders: AuthProvider[] = [
  {
    name: "Github",
    provider: githubProvider,
    icon: <GitHubIcon />
  }
];
