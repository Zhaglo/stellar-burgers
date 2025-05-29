import userOrdersSlice, {
  initialState,
  ordersHistory
} from './UserOrdersHistory';

const reducer = userOrdersSlice.reducer;

describe('UserOrdersHistory — редьюсер заказов пользователя', () => {
  it('возвращает корректное начальное состояние', () => {
    const result = reducer(undefined, { type: 'UNKNOWN' });
    expect(result).toEqual(initialState);
  });

  describe('ordersHistory async thunk', () => {
    it('pending — устанавливает флаг загрузки', () => {
      const action = { type: ordersHistory.pending.type };
      const result = reducer(initialState, action);
      expect(result.loading).toBe(true);
    });

    it('fulfilled — сохраняет полученные данные', () => {
      const mockOrders = [
        {
          _id: 'order1',
          status: 'done',
          name: 'Бургер №1',
          createdAt: '2025-05-27T12:00:00Z',
          updatedAt: '2025-05-27T13:00:00Z',
          number: 1,
          ingredients: ['ing1', 'ing2', 'ing3']
        },
        {
          _id: 'order2',
          status: 'done',
          name: 'Бургер №2',
          createdAt: '2025-05-27T14:00:00Z',
          updatedAt: '2025-05-27T14:30:00Z',
          number: 123246,
          ingredients: ['ing4', 'ing5']
        }
      ];

      const action = {
        type: ordersHistory.fulfilled.type,
        payload: mockOrders
      };
      const result = reducer({ ...initialState, loading: true }, action);

      expect(result.loading).toBe(false);
      expect(result.orders).toEqual(mockOrders);
    });

    it('rejected — записывает ошибку', () => {
      const errorMessage = 'error';
      const action = {
        type: ordersHistory.rejected.type,
        error: { message: errorMessage }
      };
      const result = reducer({ ...initialState, loading: true }, action);

      expect(result.loading).toBe(false);
      expect(result.error).toBe(errorMessage);
    });
  });
});
