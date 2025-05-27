/// <reference types="cypress" />

describe('Создание заказа', function () {
  this.beforeEach(function() {
    cy.intercept('GET', 'api/auth/user', { fixture: 'user-response.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'order-response.json' });
    cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'});

    window.localStorage.setItem('refreshToken', JSON.stringify('refreshToken'));
    cy.setCookie('accessToken', 'accessToken');

    cy.visit("/");
  })

  it('Создание заказа', function () {
    cy.get('[data-cy=ingredient_643d69a5c3f7b9001cfa093c]')
      .contains('Добавить').click();

    cy.get('[data-cy=ingredient_643d69a5c3f7b9001cfa0941]')
      .contains('Добавить').click();

    cy.get('[data-cy=burger_constructor]')
      .should('contain.text', 'Краторная булка N-200i (верх)')
      .and('contain.text', 'Краторная булка N-200i (низ)')
      .and('contain.text', 'Биокотлета из марсианской Магнолии');

    cy.get('[data-cy=order_container]')
      .contains('Оформить заказ')
      .click();

    cy.get('[data-cy=modal]')
      .should('exist')
      .and('contain.text', '912');

    cy.get('[data-cy=modal_close]').click();

    cy.get('[data-cy=modal]').should('not.exist');

    cy.get('[data-cy=burger_constructor]')
      .should('contain.text', 'Выберите начинку')
      .invoke('text')
      .then(text => {
        const count = (text.match(/Выберите булки/g) || []).length;
        expect(count).to.equal(2);
      });
  })

  it('Попытка создания пустого заказа', function () {
    cy.get('[data-cy=burger_constructor]')
      .should('contain.text', 'Выберите начинку')
      .invoke('text')
      .then(text => {
        const count = (text.match(/Выберите булки/g) || []).length;
        expect(count).to.equal(2);
      });

    cy.get('[data-cy=order_container]')
      .contains('Оформить заказ')
      .click();

    cy.get('[data-cy=modal]').should('not.exist');
  })
})
