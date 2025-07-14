import { renderHook, act } from '@testing-library/react-hooks';
import { AuthProvider, useAuth } from '../contexts/AuthContext';

describe('AuthContext', () => {
  it('should sign in with correct credentials', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    await act(async () => {
      const success = await result.current.signIn('user', '123');
      expect(success).toBe(true);
    });

    expect(result.current.isLoggedIn).toBe(true);
    expect(result.current.user).toEqual({ username: 'user' });
  });

  it('should not sign in with incorrect credentials', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    await act(async () => {
      const success = await result.current.signIn('wronguser', 'wrongpass');
      expect(success).toBe(false);
    });

    expect(result.current.isLoggedIn).toBe(false);
    expect(result.current.user).toBeNull();
  });

  it('should sign out correctly', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    
    await act(async () => {
      await result.current.signIn('user', '123');
    });

    expect(result.current.isLoggedIn).toBe(true);

    
    act(() => {
      result.current.signOut();
    });

    expect(result.current.isLoggedIn).toBe(false);
    expect(result.current.user).toBeNull();
  });
});