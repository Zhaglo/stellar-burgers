import ingredientSlice from './IngredientsSlice';
import { getIngredients } from './IngredientsSlice';

const reducer = ingredientSlice.reducer;

describe('IngredientsSlice — тесты редьюсера ингредиентов', () => {
  const defaultState = {
    ingredients: [],
    error: null,
    loading: false
  };

  it('возвращает начальное состояние по умолчанию', () => {
    const result = reducer(undefined, { type: 'UNKNOWN' });
    expect(result).toEqual(defaultState);
  });

  it('устанавливает loading в true при getIngredients.pending', () => {
    const action = { type: getIngredients.pending.type };
    const result = reducer(defaultState, action);
    expect(result.loading).toBe(true);
  });

  it('сохраняет данные и снимает загрузку при getIngredients.fulfilled', () => {
    const fakeIngredients = [
      {
        _id: '643d69a5c3f7b9001cfa093c',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        __v: 0
      },
      {
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        __v: 0
      },
      {
        _id: '643d69a5c3f7b9001cfa093e',
        name: 'Филе Люминесцентного тетраодонтимформа',
        type: 'main',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/meat-03.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
        __v: 0
      },
      {
        _id: '643d69a5c3f7b9001cfa0942',
        name: 'Соус Spicy-X',
        type: 'sauce',
        proteins: 30,
        fat: 20,
        carbohydrates: 40,
        calories: 30,
        price: 90,
        image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
        __v: 0
      }
    ];

    const action = {
      type: getIngredients.fulfilled.type,
      payload: fakeIngredients
    };

    const result = reducer({ ...defaultState, loading: true }, action);

    expect(result.loading).toBe(false);
    expect(result.ingredients).toEqual(fakeIngredients);
  });

  it('сохраняет ошибку при getIngredients.rejected', () => {
    const action = {
      type: getIngredients.rejected.type,
      error: { message: 'error' }
    };

    const result = reducer({ ...defaultState, loading: true }, action);

    expect(result.loading).toBe(false);
    expect(result.error).toBe('error');
  });
});
