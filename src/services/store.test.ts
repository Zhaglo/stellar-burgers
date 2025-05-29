import { rootReducer } from './store';

describe('rootReducer — начальная инициализация', () => {
  it('возвращает корректное начальное состояние с нужными слайсами', () => {
    const initialState = rootReducer(undefined, { type: '@@INIT' });

    expect(initialState).toEqual(
      expect.objectContaining({
        userState: expect.anything(),
        feed: expect.anything(),
        burgerConstructor: expect.anything(),
        orderHistory: expect.anything()
      })
    );
  });
});
