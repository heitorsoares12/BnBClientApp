import {authReducer, initialAuthState} from '../contexts/AuthContext';

describe('authReducer', () => {
  it('handles SIGN_IN', () => {
    const state = authReducer(initialAuthState, {
      type: 'SIGN_IN',
      payload: {username: 'user'},
    });
    expect(state.isAuthenticated).toBe(true);
    expect(state.user).toEqual({username: 'user'});
  });

  it('handles SIGN_OUT', () => {
    const signedIn = {isAuthenticated: true, user: {username: 'user'}};
    const state = authReducer(signedIn, {type: 'SIGN_OUT'});
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
  });
});
