import React  from 'react';
import SocketInput from './components/SocketInput';
import ControllerDisplay from './components/ControllerDisplay';

const App:React.FC = () => {
  return (
    <>
      <div>
        <SocketInput />
        <ControllerDisplay />
      </div>
 
    </>
  );
}

export default App;
