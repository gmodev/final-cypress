import { HomePage } from "../support/pages/homePage";
import { ProductPage } from "../support/pages/productPage";
import { CheckoutPage } from "../support/pages/checkoutPage";
import { ShoppingCartPage } from "../support/pages/shoppingCartPage";
import { PurchaseCompleted } from "../support/pages/purchaseCompleted";

describe('Entrega Final', () => {
  const homePage = new HomePage()
  const productPage = new ProductPage()
  const checkoutPage = new CheckoutPage()
  const shoppingCartPage = new ShoppingCartPage()
  const purchaseCompleted = new PurchaseCompleted()

  const username = "Pushingit" + Math.floor(Math.random() * 1000);
  const password = "123456!";
  const gender = "Other";
  const day = "8";
  const month = "May";
  const year = "1938";
  //let token;
  let data
  let check

  before(() => {
    cy.createUserFinal(username, password, gender, day, month, year)
      .then(respuesta => {
        expect(respuesta.status).to.eq(201)
      })

    cy.fixture('productFinal')
      .then(datos => {
        data = datos
      })

    cy.fixture('checkoutFinal')
      .then(datos => {
        check = datos
      })
  })

  beforeEach('Iniciar Sesion', () => {
    cy.loginFinal(username, password)
      .then(() => {
        cy.visit("");
      })
  })

  after('Eliminar usuario', () => {
    cy.deleteLogin();
  });


  it('Test de entrega final', () => {

    homePage.clickOnlineShopButton()
    productPage.agregarProducto(data.product1.name)
    productPage.agregarProducto(data.product2.name)
    productPage.clickGoToShoppingCart()

    shoppingCartPage.verificarProductoNombre(data.product1.name)
    shoppingCartPage.verificarProductoPrecio(data.product1.price)
    shoppingCartPage.verificarProductoNombre(data.product2.name);
    shoppingCartPage.verificarProductoPrecio(data.product2.price);
    shoppingCartPage.clickTotalPrice();
    shoppingCartPage.verificarPrecioTotal(data.product1.price + data.product2.price);
    cy.get('#goBillingSummary').click();
    cy.get('#goCheckout').click();
    checkoutPage.typeName(check.comprador.nombre)
    checkoutPage.typeLastName(check.comprador.apellido)
    checkoutPage.typeCardNumber(check.comprador.numeroTarjeta)
    checkoutPage.clickPurchase()

    //Verificar en el ticket de compra Nombre Apellido, productos, tarjeta de credito.
    purchaseCompleted.verificarNombreyApellido(check.comprador.nombre, check.comprador.apellido)
    purchaseCompleted.verificarNombreProductos(data.product1.name)
    purchaseCompleted.verificarNombreProductos(data.product2.name)
    purchaseCompleted.verificarNumeroTarjeta(check.comprador.numeroTarjeta)
    purchaseCompleted.verificarPrecioTotal(data.product1.price + data.product2.price)
    purchaseCompleted.clickThankYouButton()
  });

});
