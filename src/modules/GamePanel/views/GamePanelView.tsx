import React from 'react';
import Container from '@material-ui/core/Container';

import { TextBoard } from '../components';

const GamePanelView: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <TextBoard />
    </Container>
  );
};

export default GamePanelView;
