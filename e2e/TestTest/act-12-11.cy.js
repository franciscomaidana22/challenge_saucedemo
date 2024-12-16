describe('Verificar datos', {testIsolation:false}, ()=>{
    
    it('informacion del hotel', ()=>{
        cy.visit('https://automationintesting.online/')
        cy.get('p').contains('Shady Meadows B&B')
        cy.get('p').contains('The Old Farmhouse, Shady Street, Newfordburyshire, NE1 410S')
        cy.get('p').contains('012345678901')
        cy.get('p').contains('fake@fakeemail.com')
    })

    it('imagenes', ()=>{
        cy.get('img[src="/images/rbp-logo.jpg"]').should('be.visible')
        cy.get('img[src="/images/room2.jpg"]').should('be.visible')
    })

    it('descripcion del hotel', ()=>{
        cy.get('p').contains('Welcome to Shady Meadows, a delightful Bed & Breakfast nestled in the hills on Newingtonfordburyshire. A place so beautiful you will never want to leave. All our rooms have comfortable beds and we provide breakfast from the locally sourced supermarket. It is a delightful place.')
    })
})