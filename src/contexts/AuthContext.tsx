import React, { createContext, ReactNode, useReducer } from 'react';

interface AuthState {
  isAuthenticated: boolean;
  user: { username: string } | null;
}

type Action =
  | { type: 'SIGN_IN'; payload: { username: string } }
  | { type: 'SIGN_OUT' };

interface AuthActions {
  signIn(username: string, password: string): void;
  signOut(): void;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

export function reducer(state: AuthState, action: Action): AuthState {
  switch (action.type) {
    case 'SIGN_IN':
      return { isAuthenticated: true, user: { username: action.payload.username } };
    case 'SIGN_OUT':
      return { isAuthenticated: false, user: null };
    default:
      return state;
  }
}

export const AuthContext = createContext<AuthState & AuthActions>({
  ...initialState,
  signIn: () => {},
  signOut: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  function signIn(username: string, password: string) {
    if (username === 'user' && password === '123') {
      dispatch({ type: 'SIGN_IN', payload: { username } });
    }
  }

  function signOut() {
    dispatch({ type: 'SIGN_OUT' });
  }

  return (
    <AuthContext.Provider value={{ ...state, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
