import { SELECTORS } from '../../support/selectors';

describe('Модальные окна ингредиентов', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as('loadIngredients');
    cy.visit('/');
    cy.wait('@loadIngredients');
  });

  it('Можно открыть модалку с описанием ингредиента', () => {
    cy.get(SELECTORS.ingredientBun).click();

    cy.get(SELECTORS.modal)
      .should('be.visible')
      .and('include.text', 'Краторная булка N-200i');
  });

  it('Модалка закрывается при клике на крестик', () => {
    cy.get(SELECTORS.ingredientBun).click();

    cy.get(SELECTORS.modalClose).click();

    cy.get(SELECTORS.modal).should('not.exist');
  });

  it('Модалка закрывается при клике вне окна (оверлей)', () => {
    cy.get(SELECTORS.ingredientBun).click();

    cy.get(SELECTORS.modalOverlay).click({ force: true });

    cy.get(SELECTORS.modal).should('not.exist');
  });
});
