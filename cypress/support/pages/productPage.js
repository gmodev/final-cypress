export class ProductPage {
  constructor() {
    this.cards = 'div.css-4t9hm0'
    this.closeModalButton = '#closeModal'
    this.goShoppingCartButton = '#goShoppingCart'
  }


  agregarProducto(producto) {
    //cy.get(`[name ="${producto}"]`)
    cy.contains(this.cards, producto, { timeout: 10000 }).find('button[aria-label="Add to cart"]').click();
    cy.get(this.closeModalButton).click();
  }

  clickGoToShoppingCart() {
    cy.get(this.goShoppingCartButton).click();
  }
}
