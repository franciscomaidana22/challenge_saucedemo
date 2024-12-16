describe ('formTest', {testIsolation:false}, () => {

    beforeEach ( () => {
        cy.on('uncaught:exception', (err, runnable) => {
            return false;
          });
    });

    it ('visitar a la pagina', () => {
        cy.visit ('https://demoqa.com/')
        cy.title () .should ('eq', 'DEMOQA')
    });

    it ('ir al formulario, llenar y enviar', () => {
        cy.get ('h5') .contains ('Elements') .click ()
        cy.get ('span') .contains ('Forms') .click ()
        cy.get ('span') .contains ('Practice Form') .click ()
        cy.get ('#firstName') .type ('First Name')
        cy.get ('#lastName') .type ('Last Name')
        cy.get ('#userEmail') .type ('example@email.com')
        cy.get ('label[for=gender-radio-1]') .click ()
        cy.get ('#userNumber') .type ('0000000000')
        cy.get ('#subjectsInput') .type ('English{enter}')
        cy.get ('svg.css-19bqh2r') .eq ('1') .click ()
        cy.get ('#subjectsInput') .type ('Maths{enter}')
        cy.get ('label[for=hobbies-checkbox-1]') .click ()
        cy.get ('label[for=hobbies-checkbox-2]') .click ()
        cy.get ('label[for=hobbies-checkbox-3]') .click ()
        cy.get ('#currentAddress') .type ('Current Address')
        cy.get ('#state') .click ()
        cy.get ('#react-select-3-input') .type ('NCR{enter}')
        cy.get ('#city') .click ()
        cy.get ('#react-select-4-input') .type ('Delhi{enter}')
        cy.get ('#submit') .click ()
    });

})