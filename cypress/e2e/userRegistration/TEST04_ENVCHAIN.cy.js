///<reference types = "Cypress"/>

describe('User Registration', () => {
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
            cy.writeFile('.env', response.body.data.Token)
            

        })

    });
    it('GET ALL USER Page1', () => {

            cy.readFile('.env').then(text => {
                const access_token = text;
                cy.log(access_token);
                cy.request({
                    method: "GET",
                    url: "/users?page=1",
                    headers: {
                        "Authorization": "bearer " + access_token
                    }                

            }).then((response) => {
                expect(response.status).to.eq(200);
                //cy.log(response.body.data);
                const data = response.body.data;
                return (data);
                

            }).then((data) => {
                for (let i = 0; i < data.length; i++) {
                        cy.request({
                            method: "GET",
                            url: '/users/'+data[i].id,
                            headers: {
                                "Authorization": "bearer " + access_token
                            }

                    }).then((response) => {
                        expect(response.status).eql(200);
                        expect(response.body).to.have.property('id', data[i].id)

                    })
                };

            })

        })

    })
    it('GET ALL USER Page2', () => {

        cy.readFile('.env').then(text => {
            const access_token = text;
            cy.log(access_token);
            cy.request({
                method: "GET",
                url: "/users?page=2",
                headers: {
                    "Authorization": "bearer " + access_token
                }                

        }).then((response) => {
            expect(response.status).to.eq(200);
            //cy.log(response.body.data);
            const data = response.body.data;
            return (data);
            

        }).then((data) => {
            for (let i = 0; i < data.length; i++) {
                    cy.request({
                        method: "GET",
                        url: '/users/'+data[i].id,
                        headers: {
                            "Authorization": "bearer " + access_token
                        }

                }).then((response) => {
                    expect(response.status).eql(200);
                    expect(response.body).to.have.property('id', data[i].id)

                })
            };

        })

    })

})
})