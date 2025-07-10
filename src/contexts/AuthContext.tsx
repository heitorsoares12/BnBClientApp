import React, {createContext, useContext, useReducer, ReactNode} from 'react';

type UserInfo = {
  username: string;
};

type AuthState = {
  isAuthenticated: boolean;
  user: UserInfo | null;
};

export const initialAuthState: AuthState = {isAuthenticated: false, user: null};

type Action =
  | {type: 'SIGN_IN'; payload: UserInfo}
  | {type: 'SIGN_OUT'};

export function authReducer(state: AuthState, action: Action): AuthState {
  switch (action.type) {
    case 'SIGN_IN':
      return {isAuthenticated: true, user: action.payload};
    case 'SIGN_OUT':
      return {isAuthenticated: false, user: null};
    default:
      return state;
  }
}

interface AuthActions {
  signIn: (username: string, password: string) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthState & AuthActions>({
  ...initialAuthState,
  signIn: () => {},
  signOut: () => {},
});

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  const signIn = (username: string, password: string) => {
    if (username === 'user' && password === '123') {
      dispatch({type: 'SIGN_IN', payload: {username}});
    }
  };

  const signOut = () => dispatch({type: 'SIGN_OUT'});

  return (
    <AuthContext.Provider value={{...state, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
