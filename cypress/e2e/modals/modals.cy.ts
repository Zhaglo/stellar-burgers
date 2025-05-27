describe('Модальные окна ингредиентов', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as('loadIngredients');
    cy.visit('/');
    cy.wait('@loadIngredients');
  });

  it('Можно открыть модалку с описанием ингредиента', () => {
    cy.get('[data-cy=ingredient_643d69a5c3f7b9001cfa093c]').click();

    cy.get('[data-cy=modal]')
      .should('be.visible')
      .and('include.text', 'Краторная булка N-200i');
  });

  it('Модалка закрывается при клике на крестик', () => {
    cy.get('[data-cy=ingredient_643d69a5c3f7b9001cfa093c]').click();

    cy.get('[data-cy=modal_close]').click();

    cy.get('[data-cy=modal]').should('not.exist');
  });

  it('Модалка закрывается при клике вне окна (оверлей)', () => {
    cy.get('[data-cy=ingredient_643d69a5c3f7b9001cfa093c]').click();

    cy.get('[data-cy=modal_overlay]').click({ force: true });

    cy.get('[data-cy=modal]').should('not.exist');
  });
});
