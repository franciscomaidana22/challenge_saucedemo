describe('Pruebas de Acción', {testIsolation:false}, ()=>{

    it('Visitar la página y verificar la titulación', ()=>{
        cy.visit('https://www.webdriveruniversity.com/Actions/index.html#')
        cy.title().should('eq', 'WebDriver | Actions')
        cy.get('#main-header').contains('The Key to Success is to take massive ACTION!')
    })

    it('Arrastrar y soltar', ()=>{
        cy.get('#draggable').should('exist').and('be.visible').find('p').contains('DRAG ME TO MY TARGET!')
        cy.get('#droppable').should('exist').and('be.visible').find('p').contains('DROP HERE!')
        cy.get('#draggable').drag('#droppable',{force:true})
        cy.get('#droppable').contains('Dropped!')
        cy.get('#droppable').find('p').should('contain.text', 'Dropped!').and('have.css', 'background-color', 'rgb(244, 89, 80)').and('have.css', 'height', '236px')
    })

    it('Doble click', ()=>{
        cy.get('h2').contains('Double Click Me!')
        cy.get('#double-click').should('exist').and('be.visible').dblclick()
        cy.get('#double-click').should('have.class','double').dblclick()
        cy.get('#double-click').should('have.class','div-double-click')
    })

    it('Flotabilidad', ()=>{
        cy.get('.dropbtn').contains('Hover Over Me First!').should('exist').and('be.visible')
        cy.get('.dropdown-content').eq(0).invoke('css','display','block').should('exist').and('be.visible')
        .find('a').should('have.text','Link 1').and('have.attr','href','#').click()
        cy.get('.dropbtn').contains('Hover Over Me Second!').should('exist').and('be.visible')
        cy.get('.dropdown-content').eq(1).invoke('css','display','block').should('exist').and('be.visible')
        .find('a').should('have.text','Link 1').and('have.attr','href','#').click()
        cy.get('.dropbtn').contains('Hover Over Me Third!').should('exist').and('be.visible')
        cy.get('.dropdown-content').eq(2).invoke('css','display','block').should('exist').and('be.visible')
        .find('a').eq(0).should('have.text','Link 1').and('have.attr','href','#').click()
        cy.get('.dropdown-content').eq(2).find('a').eq(1).should('have.text','Link 1').and('have.attr','href','#').click()
        cy.get('.dropdown-content').invoke('css','display','none').should('not.be.visible')
    })

    it('Cliquear y mantener', ()=>{
        cy.get('#click-box').contains('Click and Hold').should('exist').and('be.visible')
        .trigger('mousedown')
        cy.get('#click-box').contains('Well done! keep holding that click now.....')
        .should('be.visible').and('have.css','background-color','rgb(0, 255, 0)').and('have.css','font-size','30px')
        .trigger('mouseup')
        cy.get('#click-box').contains('Dont release me!!!')
        .should('be.visible').and('have.css','background-color','rgb(255, 99, 71)').and('have.css','font-size','30px')
    })

})