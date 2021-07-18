import { Button, Container, TextField } from '@material-ui/core';
import PowerOffIcon from '@material-ui/icons/PowerOff';
import PowerIcon from '@material-ui/icons/Power';
import React, { useState, useContext } from 'react';
import { SocketContext } from '../context/socketContext';

interface InputState {
    value: string
    error: string 
}

const SocketInput: React.FC = () => {
    const [input, setInput] = useState<InputState>({ value: '', error: '' });
    const { connected, dispatch } = useContext(SocketContext);
    
    const onChange = (e: React.ChangeEvent<HTMLInputElement>): void =>  {      
        const newValue: InputState = { 
            value: e.target.value, 
            error: input.error, 
        }
               
        if (newValue.value.length) {
            newValue.error = '';
        }

        setInput(newValue);
    }

    const handleConnect = (): void => {
        if (input.value.length) {
            dispatch({ type: 'CONNECT', payload: input.value });
        } else {
            setInput({
                ...input,
                error: 'Please provide a socket URL',
            });
        }
    }

    const disconnect = (): void => dispatch({ type: 'DISCONNECT' });

  return (
      <Container style={{ paddingTop: '3em' }} maxWidth="sm">
          <TextField
            label="Socket URL"
            helperText={input.error}
            error={!!input.error.length}
            onChange={onChange}
            fullWidth 
          />
          <div
            style={{
                paddingTop: '1em',
                display: 'flex',
                justifyContent: 'flex-end',
            }}
          >
            <Button
                style={{ marginRight: '0.5em' }}
                variant="outlined"
                color="primary"
                startIcon={<PowerIcon />}
                onClick={handleConnect}
                disabled={connected}
            >
              CONNECT
            </Button>
            <Button
                variant="outlined"
                color="secondary"
                startIcon={<PowerOffIcon />}
                onClick={disconnect}
                disabled={!connected}
            >
               DISCONNECT
            </Button>
          </div>


      </Container>
  );
};

export default SocketInput;
