

//username: 'tester01',
//password: 'GteteqbQQgSr88SwNExUQv2ydb7xuf8c',

//username: 'tester02',
//password: 'sppm7qncqmVft5uECkwjLcLdEJGzM3Cw',

describe('Testing authentication', function(){
       
    it ('Test case 1', function(){
        cy.authenticateSession().then((response =>{
            cy.request({
                method: "GET",
                url: 'http://localhost:3000/api/clients',
                headers: {
                    'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                    'Content-Type': 'application/json'
                },
            }).then((response =>{
                cy.log(response.body[0].id)
                cy.log(response.body[0].created)
                cy.log(response.body[0].name)
                cy.log(response.body[0].email)
                cy.log(response.body[0].telephone)
            }))
        }))
    })

})

describe('Create a new client', function(){
       
    it('New Client', function(){
        cy.authenticateSession().then((response =>{
            const payload = {
                "name":"sandra11",
                "email":"sandra1@sandra.se",
                "telephone":"01025252522"
            }

            cy.request({
                method: "POST",
                url: 'http://localhost:3000/api/client/new',
                headers: {
                    'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                    'Content-Type': 'application/json'
                },
                body: payload
            }).then((response =>{
                //cy.log(JSON.stringify(response))
                const responseAsString = JSON.stringify(response)
                expect(responseAsString).to.have.string(payload.name)
            }))

        // GET request to fetch all clients
            cy.request({
                method: "GET",
                url: 'http://localhost:3000/api/clients',
                headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
        },
                }).then((response =>{
                    const responseAsString = JSON.stringify(response)
                    expect(responseAsString).to.have.string(payload.name)
                    expect(responseAsString).to.have.string(payload.email)
                    expect(responseAsString).to.have.string(payload.telephone)
            }))


        }))
       

    })

})

