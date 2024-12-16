describe('Pruebas de interaccion', ()=>{

    it('Visita la página principal de WebDriverUniversity', () => {
        cy.visit('https://www.webdriveruniversity.com/')
        cy.title().should('eq', 'WebDriverUniversity.com')
    })
    
    it('Verifica que los enlaces de la página sean accesibles', () => {
        cy.visit('https://www.webdriveruniversity.com/')
        cy.get('#data-table').invoke('removeAttr', 'target').click()
        cy.url().should('include', '/Data-Table/index.html')
        cy.go('back')
        cy.get('#contact-us').invoke('removeAttr', 'target').click()
        cy.url().should('include', '/Contact-Us/contactus.html')
    })
    
    it('Llenar el formulario de contacto', () => {
        cy.visit('https://www.webdriveruniversity.com/Contact-Us/contactus.html')
        cy.get('input[name="first_name"]').type('John')
        cy.get('input[name="last_name"]').type('Doe')
        cy.get('input[name="email"]').type('john.doe@example.com')
        cy.get('textarea[name="message"]').type('Esto es un mensaje de prueba.')
        cy.get('input[name="first_name"]').should('have.value', 'John')
        cy.get('input[name="last_name"]').should('have.value', 'Doe')
        cy.get('input[name="email"]').should('have.value', 'john.doe@example.com')
        cy.get('textarea[name="message"]').should('have.value', 'Esto es un mensaje de prueba.')
        cy.get('input[type="submit"]').click();
        cy.get('#contact_reply').should('contain', 'Thank You for your Message!')
    })
    
    it('Verifica el modal', () => {
        cy.visit('https://www.webdriveruniversity.com/Popup-Alerts/index.html')
        cy.get('#button2').click()
        cy.get('#myModal').should('be.visible')
        cy.get('#myModal').find('.close').click()
        cy.get('#myModal').should('not.be.visible')
    })
    
    it('Verifica los datos de la tabla', () => {
        cy.visit('https://www.webdriveruniversity.com/Data-Table/index.html')
        cy.get('#t01').should('be.visible')
        cy.get('#t01 tr').eq(1).find('td').eq(0).should('have.text', 'John')
    })
    
    it('Verifica el Alert de JavaScript', () => {
        cy.visit('https://www.webdriveruniversity.com/Popup-Alerts/index.html')
        cy.get('#button4').click()
        cy.on('window:alert', (str) => {
            expect(str).to.equal('I am an alert box!')
        })
    })
    

})