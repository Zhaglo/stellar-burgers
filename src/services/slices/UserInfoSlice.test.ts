import userSlice, { initialState } from './UserInfoSlice';
import {
  updateUser,
  userApi,
  toRegisterUser,
  logInUser,
  logOutUser,
  authChecked
} from './UserInfoSlice';

const reducer = userSlice.reducer;

const mockUser = {
  name: 'Игорь',
  email: 'zhaglo@mirea.ru'
};

describe('UserInfoSlice — редьюсер пользователя', () => {
  it('возвращает начальное состояние', () => {
    const result = reducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(result).toEqual(initialState);
  });

  describe('updateUser', () => {
    it('pending — loading устанавливается в true', () => {
      const result = reducer(initialState, { type: updateUser.pending.type });
      expect(result.loading).toBe(true);
    });

    it('fulfilled — обновляет пользователя', () => {
      const action = {
        type: updateUser.fulfilled.type,
        payload: { user: mockUser }
      };
      const result = reducer({ ...initialState, loading: true }, action);
      expect(result.loading).toBe(false);
      expect(result.user).toEqual(mockUser);
    });

    it('rejected — сохраняет ошибку', () => {
      const action = {
        type: updateUser.rejected.type,
        error: { message: 'error' }
      };
      const result = reducer({ ...initialState, loading: true }, action);
      expect(result.loading).toBe(false);
      expect(result.error).toBe('error');
    });
  });

  describe('userApi', () => {
    it('pending', () => {
      const result = reducer(initialState, { type: userApi.pending.type });
      expect(result.loading).toBe(true);
    });

    it('fulfilled', () => {
      const action = {
        type: userApi.fulfilled.type,
        payload: { user: mockUser }
      };
      const result = reducer({ ...initialState, loading: true }, action);
      expect(result.loading).toBe(false);
      expect(result.user).toEqual(mockUser);
    });

    it('rejected', () => {
      const action = {
        type: userApi.rejected.type,
        error: { message: 'error' }
      };
      const result = reducer({ ...initialState, loading: true }, action);
      expect(result.loading).toBe(false);
      expect(result.error).toBe('error');
    });
  });

  describe('toRegisterUser', () => {
    it('pending', () => {
      const result = reducer(initialState, {
        type: toRegisterUser.pending.type
      });
      expect(result.loading).toBe(true);
    });

    it('fulfilled', () => {
      const result = reducer(
        { ...initialState, loading: true },
        {
          type: toRegisterUser.fulfilled.type,
          payload: mockUser
        }
      );
      expect(result.loading).toBe(false);
      expect(result.user).toEqual(mockUser);
    });

    it('rejected', () => {
      const result = reducer(
        { ...initialState, loading: true },
        {
          type: toRegisterUser.rejected.type,
          error: { message: 'error' }
        }
      );
      expect(result.loading).toBe(false);
      expect(result.error).toBe('error');
    });
  });

  describe('logInUser', () => {
    it('pending', () => {
      const result = reducer(initialState, { type: logInUser.pending.type });
      expect(result.loading).toBe(true);
    });

    it('fulfilled', () => {
      const result = reducer(
        { ...initialState, loading: true },
        {
          type: logInUser.fulfilled.type,
          payload: mockUser
        }
      );
      expect(result.loading).toBe(false);
      expect(result.user).toEqual(mockUser);
    });

    it('rejected', () => {
      const result = reducer(
        { ...initialState, loading: true },
        {
          type: logInUser.rejected.type,
          error: { message: 'error' }
        }
      );
      expect(result.loading).toBe(false);
      expect(result.error).toBe('error');
    });
  });

  describe('logOutUser', () => {
    it('pending', () => {
      const result = reducer(initialState, { type: logOutUser.pending.type });
      expect(result.loading).toBe(true);
    });

    it('fulfilled — user сбрасывается', () => {
      const result = reducer(
        { ...initialState, loading: true, user: mockUser },
        { type: logOutUser.fulfilled.type }
      );
      expect(result.loading).toBe(false);
      expect(result.user).toBeNull();
    });

    it('rejected', () => {
      const result = reducer(
        { ...initialState, loading: true },
        {
          type: logOutUser.rejected.type,
          error: { message: 'error' }
        }
      );
      expect(result.loading).toBe(false);
      expect(result.error).toBe('error');
    });
  });

  it('authChecked — устанавливает флаг isAuthChecked', () => {
    const result = reducer(initialState, authChecked());
    expect(result.isAuthChecked).toBe(true);
  });
});
