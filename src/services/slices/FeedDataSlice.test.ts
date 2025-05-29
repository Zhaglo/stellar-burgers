import feedSlice, { initialState } from './FeedDataSlice';
import { getFeedData, getOrderByNumber } from './FeedDataSlice';

const reducer = feedSlice.reducer;

describe('FeedDataSlice — тестирование редьюсера ленты заказов', () => {
  it('возвращает начальное состояние', () => {
    const state = reducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(state).toEqual(initialState);
  });

  describe('getFeedData async thunk', () => {
    it('устанавливает loading в true на pending', () => {
      const nextState = reducer(initialState, {
        type: getFeedData.pending.type
      });
      expect(nextState.loading).toBe(true);
    });

    it('обновляет данные на fulfilled', () => {
      const mockResponse = {
        orders: [
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
        ],
        total: 2,
        totalToday: 2
      };

      const result = reducer(
        { ...initialState, loading: true },
        { type: getFeedData.fulfilled.type, payload: mockResponse }
      );

      expect(result.loading).toBe(false);
      expect(result.orders).toEqual(mockResponse.orders);
      expect(result.total).toBe(2);
      expect(result.totalToday).toBe(2);
    });

    it('обрабатывает ошибку при rejected', () => {
      const result = reducer(
        { ...initialState, loading: true },
        {
          type: getFeedData.rejected.type,
          error: { message: 'error' }
        }
      );

      expect(result.loading).toBe(false);
      expect(result.error).toBe('error');
    });
  });

  describe('getOrderByNumber async thunk', () => {
    it('устанавливает loading в true на pending', () => {
      const state = reducer(initialState, {
        type: getOrderByNumber.pending.type
      });
      expect(state.loading).toBe(true);
    });

    it('сохраняет первый заказ в modalOrder при fulfilled', () => {
      const mockResponse = {
        orders: [
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
        ]
      };

      const result = reducer(
        { ...initialState, loading: true },
        {
          type: getOrderByNumber.fulfilled.type,
          payload: mockResponse
        }
      );

      expect(result.loading).toBe(false);
      expect(result.modalOrder).toEqual(mockResponse.orders[0]);
    });

    it('обрабатывает ошибку при rejected', () => {
      const result = reducer(
        { ...initialState, loading: true },
        {
          type: getOrderByNumber.rejected.type,
          error: { message: 'error' }
        }
      );

      expect(result.loading).toBe(false);
      expect(result.error).toBe('error');
    });
  });
});
