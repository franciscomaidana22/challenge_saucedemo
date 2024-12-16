// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// IMPORTAR COMANDOS //
import '@4tw/cypress-drag-drop';

// PERSONALIZAR COMANDOS //

Cypress.Commands.add('validateText', (selector, expectedText) => { // cy.validateText('.header', 'Bienvenido') //
    cy.get(selector).should('contain.text', expectedText)
})

Cypress.Commands.add('typeText', (selector, textTyped) => { // cy.typeText('#username', 'usuario') //
    cy.get(selector).type(textTyped)
})

Cypress.Commands.add('clickVisible', (selector) => { // cy.clickVisible('#submit-button') //
    cy.get(selector).should('be.visible').click()
})

Cypress.Commands.add('validateUrl', (expectedUrl, exact = false) => { // cy.validateUrl('/dashboard', false); // Verifica si incluye '/dashboard' //
    if (exact) {                                                      // cy.validateUrl('https://example.com/login', true); // Verifica igualdad exacta //
        cy.url().should('eq', expectedUrl)
    } else {
        cy.url().should('include', expectedUrl)
    }
})

Cypress.Commands.add('visitValidateTitle', (url, expectedTitle) => {
    cy.visit(url);
    cy.title().should('eq', expectedTitle);
});



