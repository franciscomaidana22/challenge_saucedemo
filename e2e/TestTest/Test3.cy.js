describe('Validar la funcionalidad del To Do List', {testIsolation:false}, ()=>{

    it('Visitar la página y comprobar la titulación correctamente', ()=>{
        cy.visit('https://www.webdriveruniversity.com/To-Do-List/index.html')
        cy.get('h1').contains('TO-DO LIST').should('exist').and('be.visible')
    })

    it('Comprobar la escritura y adición de tareas', ()=>{
        cy.get('#plus-icon').should('exist').and('be.visible').click()
        cy.get('input[type=text]').should('exist').and('be.visible').type('Tarea de prueba').type('{enter}')
        cy.get('li').contains('Tarea de prueba').should('exist').and('be.visible')
    })

    it('Comprobar el tachamiento y sustracción de tareas', ()=>{
        cy.get('li').contains('Tarea de prueba').click()
        cy.get('li.completed').contains('Tarea de prueba').should('exist').and('be.visible').click()
        cy.get('li').should('not.have.class', 'completed')
        cy.get('li').contains('Tarea de prueba').find('span').click({force:true})
        cy.get('li').contains('Tarea de prueba').should('not.exist')
    })

})