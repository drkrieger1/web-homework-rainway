import React, { useContext } from 'react';
import { Container } from '@material-ui/core';
import { SocketContext } from '../context/socketContext';

const ControllerDisplay: React.FC = () => {
    const { responese } = useContext(SocketContext);
  return (
      <Container style={{ paddingTop: '3em' }} maxWidth="sm">
          {JSON.stringify(responese)}
      </Container>
  );
};

export default ControllerDisplay;

