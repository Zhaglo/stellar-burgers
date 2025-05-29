import { SELECTORS } from '../../support/selectors';

describe('Конструктор бургера — добавление ингредиентов', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as('fetchIngredients');
    cy.visit('/');
    cy.wait('@fetchIngredients');
  });

  it('Можно добавить булку', () => {
    cy.get(SELECTORS.bun)
      .should('be.visible')
      .within(() => {
        cy.contains('Добавить').click();
      });

    cy.get(SELECTORS.bunTop)
      .should('be.visible')
      .and('include.text', 'Краторная булка N-200i');

    cy.get(SELECTORS.bunBottom)
      .should('be.visible')
      .and('include.text', 'Краторная булка N-200i');
  });

  it('Можно добавить начинку', () => {
    cy.get(SELECTORS.ingredientMain).scrollIntoView();

    cy.get(SELECTORS.main)
      .should('be.visible')
      .within(() => {
        cy.contains('Добавить').click();
      });

    cy.get(SELECTORS.mainConstructor)
      .should('be.visible')
      .and('include.text', 'Биокотлета из марсианской Магнолии');
  });
});
