const baseUrl = 'https://pushing-it.onrender.com';

Cypress.Commands.add('createUserFinal', (username, password, gender, day, month, year) => {
  // Crear Usuario
  cy.request({
    method: 'POST',
    url: `${baseUrl}/api/register`,
    body: {
      username,
      password,
      gender,
      day,
      month,
      year
    },
  })
})

Cypress.Commands.add('loginFinal', (usuario, contraseña) => {
  cy.request({
    method: 'POST',
    url: `${baseUrl}/api/login`,
    body: {
      "username": usuario,
      "password": contraseña
    },
  }).then(respuesta => {
    expect(respuesta.status).to.eq(201);
    window.localStorage.setItem("token", respuesta.body.token);
    window.localStorage.setItem('user', respuesta.body.user.username);
    window.localStorage.setItem('userId', respuesta.body.user._id);
  })
})

Cypress.Commands.add('deleteLogin', () => {

  const token = window.localStorage.getItem('token');
  const username = window.localStorage.getItem('user');

  cy.request({
    method: 'DELETE',
    url: `${baseUrl}/api/deleteuser/${username}`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(deleteRespuesta => {
    expect(deleteRespuesta.status).to.eq(202)
  })
})
