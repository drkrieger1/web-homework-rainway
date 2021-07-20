import * as React from "react";

type ActionType = 
    | { type: 'CONNECT', payload: string }
    | { type: 'DISCONNECT' }
    | { type: 'SOCKET_UPDATE', payload: SocketResponese }

interface IdefaultState {
    url: string
    responese: SocketResponese | null
}

const initialState: IdefaultState = { 
    // url: 'ws://127.0.0.1:8000',
    url: '',
    responese: null,
}

interface IsocketContext {
    connected: boolean
    responese: SocketResponese | null
    dispatch: React.Dispatch<ActionType>
}

const SocketContext = React.createContext<IsocketContext>({
        connected: false,
        responese: null,
        dispatch: () => null,
    });

const socketReducer = (state: IdefaultState, action: ActionType): IdefaultState => {
    switch(action.type) {
        case 'CONNECT':
            return { ...state, url: action.payload };
        case 'DISCONNECT':
            return { url: '', responese: null };
        case 'SOCKET_UPDATE':
            return { ...state, responese: action.payload };
    }
} 

const SocketProvider: React.FC = ({ children }) =>  {
    const [state, dispatch] = React.useReducer(socketReducer, initialState);
    
    const updateGamepad = (event: any) => {
        dispatch({ 
            type: 'SOCKET_UPDATE', 
            payload: JSON.parse(event.data), 
        })
    }

     React.useEffect(() => {
        let socket: WebSocket | undefined = undefined;
        
        if (state.url.length) {
            try {
                socket = new WebSocket(state.url);
                socket.addEventListener('message', updateGamepad);
                socket.addEventListener('onclose', () => alert('Connection was closed'));
                socket.addEventListener('error', () => alert('Connection errored'));
            } catch (e) {
                alert('URL is invalid');
                dispatch({ type: 'DISCONNECT' });
            }
        } 
        
        return () => {
            socket && socket.close();
        }
    },[state.url]);

    return (
        <SocketContext.Provider 
            value={{ 
                connected: !!state.url.length, 
                responese: state.responese, 
                dispatch, 
            }}>
            { children }
        </SocketContext.Provider>
    );
};

export { SocketProvider, SocketContext };