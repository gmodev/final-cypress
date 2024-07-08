/// <reference types = "cypress"/>

export class HomePage {

  constructor() {
    this.onlineShopButton = '#onlineshoplink'
  }


  clickOnlineShopButton() {
    cy.get(this.onlineShopButton).click();
  }
}
