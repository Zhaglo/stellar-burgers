describe('Процесс оформления заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as('fetchIngredients');
    cy.intercept('GET', '**/auth/user', { fixture: 'user-response.json' }).as('fetchUser');
    cy.intercept('POST', '**/orders', { fixture: 'order-response.json' }).as('submitOrder');

    localStorage.setItem('refreshToken', JSON.stringify('refreshToken'));
    cy.setCookie('accessToken', 'accessToken');

    cy.visit('/');
    cy.wait('@fetchIngredients');
  });

  it('Успешное оформление заказа', () => {
    cy.get('[data-cy=ingredient_643d69a5c3f7b9001cfa093c]')
      .contains('Добавить')
      .click();

    cy.get('[data-cy=ingredient_643d69a5c3f7b9001cfa0941]')
      .contains('Добавить')
      .click();

    cy.get('[data-cy=burger_constructor]')
      .should('contain.text', 'Краторная булка N-200i (верх)')
      .and('contain.text', 'Краторная булка N-200i (низ)')
      .and('contain.text', 'Биокотлета из марсианской Магнолии');

    cy.get('[data-cy=order_container]')
      .contains('Оформить заказ')
      .click();

    cy.wait('@submitOrder');

    cy.get('[data-cy=modal]')
      .should('exist')
      .and('contain.text', '912');

    cy.get('[data-cy=modal_close]').click();

    cy.get('[data-cy=modal]').should('not.exist');
  });

  it('Нельзя оформить заказ без ингредиентов', () => {
    cy.get('[data-cy=order_container]')
      .contains('Оформить заказ')
      .click();

    cy.get('[data-cy=modal]').should('not.exist');
  });
});
