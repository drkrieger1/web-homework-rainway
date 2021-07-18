import React, { useEffect, useReducer } from "react";

type ActionType = 
    | { type: 'CONNECT', payload: string }
    | { type: 'DISCONNECT' }
    | { type: 'SOCKET_UPDATE', payload: SocketResponese }

interface DefaultState {
    url: string
    response: SocketResponese | null
}

const initialState: DefaultState = { 
    // url: 'ws://127.0.0.1:8000',
    url: '',
    response: null,
}

const SocketContext = React.createContext<
    { state: DefaultState; dispatch: React.Dispatch<ActionType>;}
    >({
        state: initialState,
        dispatch: () => null,
    });

const socketReducer = (state: DefaultState, action: ActionType): DefaultState =>{
    switch(action.type) {
        case 'CONNECT':
            return { ...state, url: action.payload };
        case 'DISCONNECT':
            return { url: '', response: null };
        case 'SOCKET_UPDATE':
            return { ...state, response: action.payload };
    }
} 

let socket: WebSocket | null = null;

const SocketProvider: React.FC = ({ children }) =>  {
    const [state, dispatch] = useReducer(socketReducer, initialState);
    
    useEffect(() => {
        return () => {
            socket && socket.close();
        }
    });
    
    const updateGamepad = (event: any) => {
        dispatch({ 
            type: 'SOCKET_UPDATE', 
            payload: JSON.parse(event.data), 
        })
    }

    if (!socket && state.url.length) {
        console.log('connecting to websocket..');
        socket = new WebSocket(state.url);

        socket.addEventListener('message', updateGamepad);
        socket.addEventListener('onclose', () => alert('Conection was closed'));
        socket.addEventListener('error', () => alert('Conection errored'));
        
    } else if (socket && !state.url.length) {
        socket.close();
    }

    return (
        <SocketContext.Provider value={{ state:state, dispatch:dispatch }}>
            { children }
        </SocketContext.Provider>
    );
};

export { SocketProvider, SocketContext };