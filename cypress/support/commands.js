// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
export const login = () => {
  let access_token = '';
  /*const username = Cypress.env('username')
    //const password = Cypress.env('password')
  
    // it is ok for the username to be visible in the Command Log
    expect(username, 'username was set').to.be.a('string').and.not.be.empty
    // but the password value should not be shown
    if (typeof password !== 'string' || !password) {
      throw new Error('Missing password value, set using CYPRESS_password=...')
    }*/

  cy.request({
    method: 'POST',
    url: '/authaccount/login',
    //form: true,
    body: Cypress.env(),
  }).then((response) => {
    cy.log(JSON.stringify(response));
    expect(response.status).to.eq(200);
    expect(response.body.message).eq('success');
    expect(response.body.data.Id).eq(214935);
    expect(response.body.data.Name).eq('Developer');
    expect(response.body.data.Email).eq('DevOps55@gmail.com');
    cy.log(response.body.data.Token);
    access_token = response.body.data.Token;
  });
  //cy.getCookie('connect.sid').should('exist')
};
