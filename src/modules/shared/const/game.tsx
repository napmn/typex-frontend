import React from 'react';

import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SubjectIcon from '@material-ui/icons/Subject';

import { GameType } from '../types';

export const gameTypes: GameType[] = [
  {
    name: 'text',
    verboseName: 'Text',
    about: 'Type longer texts that were extracted from books or film dialogues. This mode is the best at testing your consistency in typing speed.',
    // about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mattis eu nisl ac vestibulum. Proin ultricies nisl sit amet ipsum.',
    path: '/play/text',
    icon: <SubjectIcon />,
    color: '#6ff9ff',
    disabled: false
  },
  {
    name: 'quote',
    verboseName: 'Quote',
    about: 'Type shorter famous quotes by philosophers, politicians, actors, ... This mode is suitable if you really want to peak those CPM on short text.',
    path: '/play/quote',
    icon: <FormatQuoteIcon />,
    color: '#ff94c2',
    disabled: false
  },
  {
    name: 'dictionary',
    verboseName: 'Dictionary',
    about: 'Get text made of random words to practice your typing skills.',
    // about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mattis eu nisl ac vestibulum. Proin ultricies nisl sit amet ipsum.',
    path: '/play/dictionary',
    icon: <MenuBookIcon />,
    color: '#b2fab4',
    disabled: true
  },
];
