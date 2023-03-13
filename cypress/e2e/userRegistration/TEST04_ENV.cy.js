///<reference types = "Cypress"/>

describe('User Registration', () => {
  let access_token = '';
  let id1 = '';
  let id2 = '';
  let id3 = '';
  it('Generate token', () => {
    cy.request({
      method: 'POST',
      url: '/authaccount/login',
      //form: true,
      body: {
        email: 'DevOps55@gmail.com',
        password: 123456,
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
      cy.writeFile('.env.test', response.body.data.Token);
      cy.readFile('.env.test')
        .then((text) => {
          const access_token = text;
          cy.log(access_token);
          cy.request({
            method: 'GET',
            url: '/users?page=1',
            headers: {
              Authorization: 'bearer ' + access_token,
            },
          });
        })
        .then((response) => {
          expect(response.status).eql(200);
        });
    });
  });
});
