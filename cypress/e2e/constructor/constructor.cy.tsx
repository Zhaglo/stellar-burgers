describe('Добавление ингредиента из списка в конструктор', function () {
  this.beforeEach(function() {
    cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'});
    cy.visit('/');
  })

  it('Добавление булок', function () {
    cy.get('[data-cy=bun_ingredients]')
      .should('exist')
      .and('contain.text', 'Краторная булка N-200i');

    cy.get('[data-cy=ingredient_643d69a5c3f7b9001cfa093c]')
      .should('exist')
      .within(() => {
        cy.contains('Добавить').click();
      });

    cy.get('[data-cy=bun_top_constructor]')
      .should('exist')
      .and('contain.text', 'Краторная булка N-200i');

    cy.get('[data-cy=bun_bottom_constructor]')
      .should('exist')
      .and('contain.text', 'Краторная булка N-200i');
  })

  it('Добавление начинок', function () {
    cy.get('[data-cy=main_ingredients]')
      .should('exist')
      .and('contain.text', 'Биокотлета из марсианской Магнолии');

    cy.get('[data-cy=ingredient_643d69a5c3f7b9001cfa0941]')
      .should('exist')
      .within(() => {
        cy.contains('Добавить').click();
      });

    cy.get('[data-cy=main_constructor]')
      .should('exist')
      .and('contain.text', 'Биокотлета из марсианской Магнолии');
  })
})
