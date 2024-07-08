export class CheckoutPage {
  constructor() {
    this.nameInput = '#FirstName'
    this.lastNameInput = '#lastName'
    this.cardNumberInput = '#cardNumber'
    this.purchaseButton = '[data-cy="purchase"]'
    this.errorMessage = '#errorMessage'

    //this.sellid = '[data-cy="sellId"]'
    //this.name = 'p[data-cy="name"]'
    //this.creditCard = '[data-cy="creditCard"]';
    //this.totalPrice = '[data-cy="totalPrice"]';
    //this.thankYouButton = '[data-cy="thankYou"]'

  }

  typeName(name) {
    cy.get(this.nameInput).type(name);
  }

  typeLastName(lastName) {
    cy.get(this.lastNameInput).type(lastName);
  }

  typeCardNumber(cardNumber) {
    cy.get(this.cardNumberInput).type(cardNumber);
  }

  clickPurchase() {
    cy.get(this.purchaseButton).click();
  }


  returnErrorMessage() {
    return cy.get(this.errorMessage);
  }

  clickThankYou() {
    cy.get(this.thankYouButton).click();
  }
}
