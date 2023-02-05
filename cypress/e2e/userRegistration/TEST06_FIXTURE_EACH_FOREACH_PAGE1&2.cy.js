///<reference types = "Cypress"/>

describe('User Registration LOGIN', () => {

    it('GET User Data By ID PAGE1', () => {
        const data = require('../../fixtures/page1.json')
        cy.readFile('.env.test').then(text => {
            const access_token = text;
            cy.log(access_token);
            cy.wrap(data.data).each((data, k) => {
                for (k = 0; k < 1; k++) {
                    cy.request({
                        method: 'GET',
                        url: `/users/${data.id}`,
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
        })

    })
    context('GET Users By ID forEach PAGE1', () => {
        const data = require('../../fixtures/page1.json')
        //data = JSON.parse(data);
        Array.from(data.data).forEach((dataobj) => {

            it(dataobj.name, () => {
                cy.readFile('.env.test').then(text => {
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
    });
    it('GET User Data By ID PAGE 2', () => {
        const data = require('../../fixtures/page2.json')
        cy.readFile('.env.test').then(text => {
            const access_token = text;
            cy.log(access_token);
            cy.wrap(data.data).each((data, k) => {
                for (k = 0; k < 1; k++) {
                    cy.request({
                        method: 'GET',
                        url: `/users/${data.id}`,
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
        })

    })
    context('GET Users By ID forEach PAGE2', () => {
        const data = require('../../fixtures/page2.json')
        //data = JSON.parse(data);
        Array.from(data.data).forEach((dataobj) => {

            it(dataobj.name, () => {
                cy.readFile('.env.test').then(text => {
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
    });


});