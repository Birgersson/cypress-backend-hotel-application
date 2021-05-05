const ENPOINT_GET_CLIENTS = 'http://localhost:3000/api/clients'
const ENDPOINT_NEW_CLIENT =  'http://localhost:3000/api/client/new'


function createClientRequest(cy){
        cy.authenticateSession().then((response =>{
            const payload = {
                "name":"test1",
                "email":"sandra@test.se",
                "telephone":"0100000000"
            }
            cy.request({
                method: "POST",
                url: ENDPOINT_NEW_CLIENT,
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
            getRequestAllClientsWithAssertion(cy, payload.name, payload.email, payload.telephone)
        }))
    }

function getRequestAllClientsWithAssertion(cy, name, email, telephone){
         // GET request to fetch all clients
         cy.request({
            method: "GET",
            url: ENPOINT_GET_CLIENTS,
            headers:{
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
    },
            }).then((response =>{
                const responseAsString = JSON.stringify(response)
                expect(responseAsString).to.have.string(name)
                expect(responseAsString).to.have.string(email)
                expect(responseAsString).to.have.string(telephone)
        }))
}

function getAllClientsRequest(cy){
    cy.authenticateSession().then((response =>{
        cy.request({
            method: "GET",
            url: ENPOINT_GET_CLIENTS,
            headers:{
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
    },
            }).then((response =>{
                const responseAsString = JSON.stringify(response)
                cy.log(responseAsString)
        }))
    }))
}

module.exports = {
    createClientRequest,
    getRequestAllClientsWithAssertion,
    getAllClientsRequest
}