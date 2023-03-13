///<reference types = "Cypress"/>

describe('User Registration', () => {
  let access_token = '';
  let id1 = '';
  let id2 = '';
  let id3 = '';
  let data = '';
  it('Generate token', () => {
    //const username = Cypress.env('email')
    //const password = Cypress.env('password')
    cy.request({
      method: 'POST',
      url: '/authaccount/login',
      //form: true,
      body: Cypress.env(),
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
    });
  });
  it('GET ALL USER Page1', () => {
    cy.readFile('.env.test').then((text) => {
      const access_token = text;
      cy.log(access_token);
      cy.request({
        method: 'GET',
        url: '/users?page=1',
        headers: {
          Authorization: 'bearer ' + access_token,
        },
      })
        .then((response) => {
          expect(response.status).to.eq(200);
          //cy.log(response.body.data);
          const data = response.body.data;
          return data;
        })
        .then((data) => {
          for (let i = 0; i < data.length; i++) {
            cy.request({
              method: 'GET',
              url: '/users/' + data[i].id,
              headers: {
                Authorization: 'bearer ' + access_token,
              },
            }).then((response) => {
              expect(response.status).eql(200);
              expect(response.body).to.have.property('id', data[i].id);
            });
          }
        });
    });
  });
  it('GET ALL USER Page2', () => {
    cy.readFile('.env.test').then((text) => {
      const access_token = text;
      cy.log(access_token);
      cy.request({
        method: 'GET',
        url: '/users?page=2',
        headers: {
          Authorization: 'bearer ' + access_token,
        },
      })
        .then((response) => {
          expect(response.status).to.eq(200);
          //cy.log(response.body.data);
          const data = response.body.data;
          return data;
        })
        .then((data) => {
          for (let i = 0; i < data.length; i++) {
            cy.request({
              method: 'GET',
              url: '/users/' + data[i].id,
              headers: {
                Authorization: 'bearer ' + access_token,
              },
            }).then((response) => {
              expect(response.status).eql(200);
              expect(response.body).to.have.property('id', data[i].id);
            });
          }
        });
    });
  });

  it('GET ALL USER Each Page1', () => {
    cy.readFile('.env.test').then((text) => {
      const access_token = text;
      cy.log(access_token);
      cy.request({
        method: 'GET',
        url: '/users?page=1',
        headers: {
          Authorization: 'bearer ' + access_token,
        },
      })
        .then((response) => {
          expect(response.status).to.eq(200);
          //cy.log(response.body.data);
          const data = response.body.data;
          return data;
        })
        .then((data) => {
          cy.wrap(data).each((data, k) => {
            for (k = 0; k < 1; k++) {
              cy.request({
                method: 'GET',
                url: `http://restapi.adequateshop.com/api/users/${data.id}`,
                headers: {
                  Authorization: 'bearer ' + access_token,
                },
              }).then((response) => {
                expect(response.status).to.eq(200);
                //cy.wrap(response.body.usuarios.length).as('length');
                //const leng = response.body.usuarios.length;
                //cy.log(leng)
                //expect(response.body.quantidade).to.eq(leng);
                expect(response.body).to.have.property('id', data.id);
                expect(response.body).has.property('name', data.name);
                expect(response.body).to.have.property('email', data.email);
                expect(response.body).to.have.property(
                  'profilepicture',
                  data.profilepicture
                );
                expect(response.body).to.have.property(
                  'location',
                  data.location
                );
                expect(response.body).to.have.property(
                  'createdat',
                  data.createdat
                );
              });
            }
          });
        });
    });
  });
});
/*it('Get user by id for each', () => {
        cy.wrap(data).each((data, k) => {
            for (k = 0; k < 1; k++) {
                cy.request({
                    method: 'GET',
                    url: `http://restapi.adequateshop.com/api/users/${data.id}`,
                    headers: {
                        "Authorization": "bearer " + access_token
                    }
                }).then((response) => {
                    expect(response.status).to.eq(200)
                    //cy.wrap(response.body.usuarios.length).as('length');
                    //const leng = response.body.usuarios.length;
                    //cy.log(leng)
                    //expect(response.body.quantidade).to.eq(leng);
                    expect(response.body).to.have.property('id', data.id)
                    expect(response.body).has.property('name', data.name)
                    expect(response.body).to.have.property('email', data.email)
                    expect(response.body).to.have.property('profilepicture', data.profilepicture)
                    expect(response.body).to.have.property('location', data.location)
                    expect(response.body).to.have.property('createdat', data.createdat)


                })
            };



        })

    })*/
