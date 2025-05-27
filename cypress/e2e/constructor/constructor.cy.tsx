describe('Конструктор бургера — добавление ингредиентов', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as('fetchIngredients');
    cy.visit('/');
    cy.wait('@fetchIngredients');
  });

  it('Можно добавить булку', () => {
    cy.get('[data-cy=ingredient_643d69a5c3f7b9001cfa093c]')
      .should('be.visible')
      .within(() => {
        cy.contains('Добавить').click();
      });

    cy.get('[data-cy=bun_top_constructor]')
      .should('be.visible')
      .and('include.text', 'Краторная булка N-200i');

    cy.get('[data-cy=bun_bottom_constructor]')
      .should('be.visible')
      .and('include.text', 'Краторная булка N-200i');
  });

  it('Можно добавить начинку', () => {
    cy.get('[data-cy=ingredient_643d69a5c3f7b9001cfa0941]')
      .should('be.visible')
      .within(() => {
        cy.contains('Добавить').click();
      });

    cy.get('[data-cy=main_constructor]')
      .should('be.visible')
      .and('include.text', 'Биокотлета из марсианской Магнолии');
  });
});
