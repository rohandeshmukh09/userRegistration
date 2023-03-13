///<reference types = "Cypress"/>

describe('User Registration', () => {
  let access_token = '';
  let username = '';
  let password = '';
  //const username = require('C:/Users/rodeshmu/DevOps/userRegistration/env.json');
  //const password = require('C:/Users/rodeshmu/DevOps/userRegistration/env.json');
  const data = require('../../../env.json');
  it('Login Check Env json', () => {
    //const username = Cypress.env('username')
    //const password = Cypress.env('password')

    cy.request({
      method: 'POST',
      url: '/authaccount/login',
      //form: true,
      body: {
        email: `${data.env.username}`,
        password: `${data.env.password}`,
      },
    }).then((response) => {
      cy.log(JSON.stringify(response));
      expect(response.status).to.eq(200);
      cy.log(response.body.message);
      expect(response.body.message).eq('success');
      expect(response.body.data.Id).eq(214935);
      expect(response.body.data.Name).eq('Developer');
      expect(response.body.data.Email).eq('DevOps55@gmail.com');
      cy.log(response.body.data.Token);
      access_token = response.body.data.Token;
    });
  });
  /*
        it('Login Check Cypress Env', () => {
            const username = Cypress.env('username')
            const password = Cypress.env('password')
            //expect(username, 'username was set').to.be.a('string').and.not.be.empty
            // expect(password, 'password was set').to.be.a('string').and.not.be.empty
    
            cy.request({
                method: 'POST',
                url: '/authaccount/login',
                //form: true,
                body: {
                    "email": username,
                    "password": password
                }
    
            }).then(response => {
                cy.log(JSON.stringify(response));
                expect(response.status).to.eq(200);
                cy.log(response.body.message);
                expect(response.body.message).eq("success");
                expect(response.body.data.Id).eq(207904);
                expect(response.body.data.Name).eq("Developer");
                expect(response.body.data.Email).eq("DevOps55@gmail.com");
                cy.log(response.body.data.Token);
                access_token = response.body.data.Token;
    
    
            })
    
        });*/
});
