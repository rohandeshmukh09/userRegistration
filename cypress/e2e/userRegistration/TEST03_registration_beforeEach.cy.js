///<reference types = "Cypress"/>

describe('User Registration', () => {
    let access_token = "";
    let id1 = "";
    let id2 = "";
    let id3 = "";
    beforeEach('Generate token', () => {
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
            cy.request({
                method: "GET",
                url: "/users?page=1",
                headers: {
                    "Authorization": "bearer " + access_token
                }

            }).then(response => {
                expect(response.status).eql(200);
                id1 = response.body.data[0].id;
                id2 = response.body.data[1].id;
                id3 = response.body.data[2].id;
                cy.log("userid", +  id1);
                cy.log("userid", +  id2);
                cy.log("userid", +  id3)

            })
        })
    })

    it('Register the user', () => {

        cy.request({
            method: 'POST',
            url: '/authaccount/registration',
            //form: true,
            body: {
                "name": "Developer",
                "email": "DevOps55@gmail.com",
                "password": 123456
            }

        }).then(response => {
            cy.log(JSON.stringify(response));
            expect(response.status).to.eq(200);
            cy.log(response.body.message);
            expect(response.body.message).eq("The email address you have entered is already registered");

        })

    })

    it('Get the user with ID1', () => {
        cy.request({
            method: "GET",
            url: '/users/' + id1 + '',
            headers: {
                "Authorization": "bearer " + access_token
            }

        }).then(response => {
            expect(response.status).eql(200);
            cy.log(JSON.stringify(response));
            expect(response.body.id).eq(id1);

        })


    })

    it('Get the user with ID2', () => {
        cy.request({
            method: "GET",
            url: '/users/' + id2 + '',
            headers: {
                "Authorization": "bearer " + access_token
            }

        }).then(response => {
            expect(response.status).eql(200);
            cy.log(JSON.stringify(response));
            expect(response.body.id).eq(id2);

        })


    })

    it('Get the user with ID3', () => {
        cy.request({
            method: "GET",
            url: '/users/' + id3 + '',
            headers: {
                "Authorization": "bearer " + access_token
            }

        }).then(response => {
            expect(response.status).eql(200);
            cy.log(JSON.stringify(response));
            expect(response.body.id).eq(id3);

        })


    })


})