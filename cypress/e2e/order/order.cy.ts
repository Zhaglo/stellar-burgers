import { SELECTORS } from '../../support/selectors';

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
    cy.get(SELECTORS.ingredientBun)
      .contains('Добавить')
      .click();

    cy.get(SELECTORS.ingredientMain)
      .contains('Добавить')
      .click();

    cy.get(SELECTORS.burgerConstructor)
      .should('contain.text', 'Краторная булка N-200i (верх)')
      .and('contain.text', 'Краторная булка N-200i (низ)')
      .and('contain.text', 'Биокотлета из марсианской Магнолии');

    cy.get(SELECTORS.orderContainer)
      .contains('Оформить заказ')
      .click();

    cy.wait('@submitOrder');

    cy.get(SELECTORS.modal)
      .should('exist')
      .and('contain.text', '912');

    cy.get(SELECTORS.modalClose).click();

    cy.get(SELECTORS.modal).should('not.exist');
  });

  it('Нельзя оформить заказ без ингредиентов', () => {
    cy.get(SELECTORS.orderContainer)
      .contains('Оформить заказ')
      .click();

    cy.get(SELECTORS.modal).should('not.exist');
  });
});
