describe('Работа модальных окон', function () {
  this.beforeEach(function() {
    cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'});
    cy.visit('/');
  })

  it('Открытие модального окна ингредиента', function () {
    cy.get('[data-cy=ingredient_643d69a5c3f7b9001cfa093c]')
      .should('exist')
      .click();

    cy.get('[data-cy=modal]')
      .contains('Краторная булка N-200i')
      .should('exist');
  })

  it('Закрытие по клику на крестик', function () {
    cy.get('[data-cy=ingredient_643d69a5c3f7b9001cfa093c]').click();

    cy.get('[data-cy=modal]').should('exist');

    cy.get('[data-cy=modal_close]').click();

    cy.get('[data-cy=modal]').should('not.exist');
  })

  it('Закрытие по клику на оверлей', function () {
    cy.get('[data-cy=ingredient_643d69a5c3f7b9001cfa093c]').click();

    cy.get('[data-cy=modal]').should('exist');

    cy.get('[data-cy=modal_overlay]').click({ force: true });

    cy.get('[data-cy=modal]').should('not.exist');
  })
})
