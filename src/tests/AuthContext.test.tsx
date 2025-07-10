import { reducer } from '../contexts/AuthContext';

describe('AuthContext reducer', () => {
  it('handles SIGN_IN', () => {
    const state = reducer({ isAuthenticated: false, user: null }, { type: 'SIGN_IN', payload: { username: 'user' } });
    expect(state.isAuthenticated).toBe(true);
    expect(state.user).toEqual({ username: 'user' });
  });

  it('handles SIGN_OUT', () => {
    const state = reducer({ isAuthenticated: true, user: { username: 'user' } }, { type: 'SIGN_OUT' });
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
  });
});
