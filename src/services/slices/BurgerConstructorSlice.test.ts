import reducerSlice, { initialState } from './BurgerConstructorSlice';
import {
  addIngredient,
  removeIngredient,
  moveUpIngredient,
  moveDownIngredient,
  clearOrder
} from './BurgerConstructorSlice';

const reducer = reducerSlice.reducer;

const mockIngredients = {
  bun: {
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
  mainA: {
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
  mainB: {
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
  sauce: {
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
};

describe('BurgerConstructorSlice — тесты редьюсера конструктора', () => {
  it('возвращает начальное состояние по умолчанию', () => {
    const initial = reducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(initial).toEqual(initialState);
  });

  it('добавляет ингредиенты корректно', () => {
    let state = reducer(undefined, addIngredient(mockIngredients.bun));
    expect(state.constructorItems.bun).toMatchObject(mockIngredients.bun);
    expect(state.constructorItems.ingredients.length).toBe(0);

    state = reducer(state, addIngredient(mockIngredients.mainA));
    state = reducer(state, addIngredient(mockIngredients.mainB));
    state = reducer(state, addIngredient(mockIngredients.sauce));

    expect(state.constructorItems.ingredients).toHaveLength(3);
    expect(state.constructorItems.ingredients[0]).toMatchObject(
      mockIngredients.mainA
    );
    expect(state.constructorItems.ingredients[1]).toMatchObject(
      mockIngredients.mainB
    );
    expect(state.constructorItems.ingredients[2]).toMatchObject(
      mockIngredients.sauce
    );
  });

  it('удаляет ингредиент корректно', () => {
    let state = reducer(undefined, { type: '' });
    state = reducer(state, addIngredient(mockIngredients.bun));
    state = reducer(state, addIngredient(mockIngredients.mainA));
    state = reducer(state, addIngredient(mockIngredients.mainB));

    const toDelete = state.constructorItems.ingredients.find(
      (el) => el._id === mockIngredients.mainA._id
    );

    expect(toDelete).toBeDefined();
    expect(state.constructorItems.ingredients).toContainEqual(toDelete);

    state = reducer(state, removeIngredient(toDelete!));
    expect(state.constructorItems.ingredients).not.toContainEqual(toDelete);
    expect(state.constructorItems.ingredients).toHaveLength(1);
  });

  it('перемещает ингредиенты вверх и вниз', () => {
    let state = reducer(undefined, { type: '' });

    state = reducer(state, addIngredient(mockIngredients.mainA));
    state = reducer(state, addIngredient(mockIngredients.mainB));

    state = reducer(state, moveDownIngredient(0));
    expect(state.constructorItems.ingredients[0]).toMatchObject(
      mockIngredients.mainB
    );
    expect(state.constructorItems.ingredients[1]).toMatchObject(
      mockIngredients.mainA
    );

    state = reducer(state, moveUpIngredient(1));
    expect(state.constructorItems.ingredients[0]).toMatchObject(
      mockIngredients.mainA
    );
    expect(state.constructorItems.ingredients[1]).toMatchObject(
      mockIngredients.mainB
    );
  });

  it('очищает конструктор при оформлении заказа', () => {
    let state = reducer(undefined, { type: '' });

    state = reducer(state, addIngredient(mockIngredients.bun));
    state = reducer(state, addIngredient(mockIngredients.mainA));
    state = reducer(state, addIngredient(mockIngredients.mainB));
    state = reducer(state, addIngredient(mockIngredients.sauce));

    state = reducer(state, clearOrder());

    expect(state.constructorItems.bun).toBeNull();
    expect(state.constructorItems.ingredients).toHaveLength(0);
  });
});
