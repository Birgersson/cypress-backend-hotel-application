// <reference types="cypress" />

//const { post } = require("cypress/types/jquery")

// curl 'http://localhost:3000/api/login' 
// -H 'User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:88.0) Gecko/20100101 Firefox/88.0' 
// -H 'Accept: application/json' 
// -H 'Accept-Language: en-US,en;q=0.5' 
// --compressed -H 'Referer: http://localhost:3000/login' 
// -H 'Content-Type: application/json;charset=UTF-8' 
// -H 'Origin: http://localhost:3000' 
// -H 'Connection: keep-alive' 
// --data-raw '{"username":"tester01","password":"GteteqbQQgSr88SwNExUQv2ydb7xuf8c"}'


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
            }).then(response =>{
                cy.log(response.body[0].id)
                cy.log(response.body[0].created)
                cy.log(response.body[0].name)
                cy.log(response.body[0].email)
                cy.log(response.body[0].telephone)
            })
        }))
    })

})