require('dotenv').config();

describe('testing studio', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('displays the workshop intro section', () => {
    cy.get('.workshop-intro').should('be.visible');
    cy.contains('h2', 'Molding Art, Firing Passions.').should('be.visible');
  });

  it('displays the featured products section', () => {
    cy.get('.featured-products').should('be.visible');
    cy.get('.featured-products img').should('have.length.greaterThan', 0);
  });

  it('navigates to the workshops page when the "Read More" button is clicked', () => {
    cy.contains('button', 'Read More').click();
    cy.url().should('include', '/workshops');
  });

  it('navigates the workshop page and clicks on calender', () => {
    cy.visit('/workshops');
    cy.contains('button', 'Join workshop').click();
    cy.get('.react-calendar');
    cy.get(`[aria-label="31 January 2024"]`).click();
    cy.get('[data-testid="workshop-booking-btn"]')
      .contains('button', 'Add to Cart')
      .click();
  });
  it('navigates to the menu and enters shop page', () => {
    cy.contains('button', 'Open main menu').click({ force: true });
    cy.get('a').contains('Shop').should('be.visible');
    cy.contains('a', 'Shop').click();
    cy.url().should('include', '/products');
  });

  it('gets product name', () => {
    cy.visit('/products');
    cy.get('[ data-testid="product-name')
      .contains('p', 'Rustic Ceramic Pendant')
      .should('be.visible');
  });
  it('adds product to cart', () => {
    cy.visit('/products');
    cy.get('[data-testid="product-name"]')
      .contains('p', 'Rustic Ceramic Pendant')
      .should('be.visible');
    cy.get('[data-testid="shopping-cart-icon"]').eq(0).click({ force: true });
  });
  it('gets checkout page', () => {
    cy.visit('/products');
    cy.get('[data-testid="product-name"]')
      .contains('p', 'Rustic Ceramic Pendant')
      .should('be.visible');
    cy.get('[data-testid="shopping-cart-icon"]').eq(0).click({ force: true });
    cy.get('[data-testid="shopping-bag-icon"]').click({ force: true });
    cy.contains('button', 'Checkout').should('be.visible').click();
  });
});
