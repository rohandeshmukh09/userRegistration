///<reference types = "Cypress"/>

describe('User Registration LOGIN', () => {
    let access_token = "";
    let id1 = "";
    let id2 = "";
    let id3 = "";
    it('Generate token', () => {
        cy.request({
            method: 'POST',
            url: '/authaccount/login',
            //form: true,
            body: {
                "email": "DevOps55@gmail.com",
                "password": 123456
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
            cy.writeFile('.env.test', response.body.data.Token)
            cy.readFile('.env.test').then(text => {
                const access_token = text;
                cy.log(access_token);
                cy.request({
                    method: "GET",
                    url: "/users?page=1",
                    headers: {
                        "Authorization": "bearer " + access_token
                    }

                });

            }).then(response => {
                expect(response.status).eql(200);
                cy.writeFile('cypress/fixtures/page1.json', response.body);
                cy.log(JSON.stringify(response.body))
                cy.wrap(response.body.length).as('length');
                const leng = response.body.length;
                cy.log(leng);
                expect(response.body.per_page).to.eq(response.body.data.length);

            })
            cy.fixture('page1').then((data) => {
                cy.wrap(data.data.length).as('length');
                const leng = data.data.length;
                cy.log(leng)
                expect(data.data.length).to.eq(leng);

                expect(data.data[0].name).to.exist

                Cypress._.each(data.data, (userdata) => {
                    expect(userdata.id).to.not.be.null
                    expect(userdata.name).to.not.be.null
                    expect(userdata.email).to.not.be.null
                    expect(userdata.profilepicture).to.not.be.null
                    expect(userdata.location).to.not.be.null
                    expect(userdata.createdat).to.not.be.null

                    expect(userdata).to.have.all.keys(
                        'id', 'name', 'email', 'profilepicture', 'location', 'createdat'
                    )

                })
            })
            cy.readFile('.env.test').then(text => {
                const access_token = text;
                cy.log(access_token);
                cy.request({
                    method: "GET",
                    url: "/users?page=2",
                    headers: {
                        "Authorization": "bearer " + access_token
                    }

                });

            }).then(response => {
                expect(response.status).eql(200);
                cy.writeFile('cypress/fixtures/page2.json', response.body);
                cy.log(JSON.stringify(response.body))
                cy.wrap(response.body.length).as('length');
                const leng = response.body.length;
                cy.log(leng);
                expect(response.body.per_page).to.eq(response.body.data.length);

            })
            cy.fixture('page2').then((data) => {
                cy.wrap(data.data.length).as('length');
                const leng = data.data.length;
                cy.log(leng)
                expect(data.data.length).to.eq(leng);

                expect(data.data[0].name).to.exist

                Cypress._.each(data.data, (userdata) => {
                    expect(userdata.id).to.not.be.null
                    expect(userdata.name).to.not.be.null
                    expect(userdata.email).to.not.be.null
                    expect(userdata.profilepicture).to.not.be.null
                    expect(userdata.location).to.not.be.null
                    expect(userdata.createdat).to.not.be.null

                    expect(userdata).to.have.all.keys(
                        'id', 'name', 'email', 'profilepicture', 'location', 'createdat'
                    )

                })
            })

        })

    })

});

/*context('GET Users By ID forEach', () => {
        const data = require('../../fixtures/page2.json')
        //data = JSON.parse(data);
        Array.from(data.data).forEach((dataobj) => {

            it(dataobj.name, () => {
                cy.readFile('.env').then(text => {
                    const access_token = text;
                    cy.log(access_token);
                    cy.request({
                        method: 'GET',
                        url: `/users/${dataobj.id}`,
                        headers: {
                            "Authorization": "bearer " + access_token
                        }
                    }).then((response) => {
                        expect(response.status).to.eq(200)

                        expect(response.body).to.have.property('id', dataobj.id)
                        expect(response.body).has.property('name', dataobj.name)
                        expect(response.body).to.have.property('email', dataobj.email)
                        expect(response.body).to.have.property('profilepicture', dataobj.profilepicture)
                        expect(response.body).to.have.property('location', dataobj.location)
                        expect(response.body).to.have.property('createdat', dataobj.createdat)


                    })
                });
            })
        });
    })*/

/*it.skip('GET User Data By ID', () => {
    const data = require('../../fixtures/page1.json')
    cy.wrap(data.data).each((data, k) => {
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