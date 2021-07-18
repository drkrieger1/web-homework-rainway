import React, { useContext } from 'react';
import TextField from '@material-ui/core/TextField';


import './App.css';
import { SocketContext } from './context/socketContext';

const App = () => {
  const { state, dispatch } = useContext(SocketContext);

  console.log(state);
  console.log(dispatch);
  return (
    <>
      <form noValidate autoComplete="off">
        <TextField id="standard-basic" label="Standard" fullWidth />
      </form>
    </>
  );
}

export default App;
