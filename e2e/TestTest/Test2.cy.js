describe('', {testIsolation:false}, ()=>{

    const dropdowns = [
        {id: '#dropdowm-menu-1', options: ['java', 'c#', 'python', 'sql']},
        {id: '#dropdowm-menu-2', options: ['eclipse', 'maven', 'testng', 'junit']},
        {id: '#dropdowm-menu-3', options: ['html', 'css', 'javascript', 'jquery']}
    ]

    it('Dropdowns Menu', ()=>{
        cy.visit('https://www.webdriveruniversity.com/Dropdown-Checkboxes-RadioButtons/index.html')
        cy.get('h2').contains('Dropdown Menu')
        dropdowns.forEach((dropdown) => {
            cy.get(dropdown.id).should('exist').and('be.visible')
            cy.get(`${dropdown.id} > option`).should('have.length', dropdown.options.length)
            dropdown.options.forEach((optionValue) => {
                cy.get(dropdown.id).select(optionValue).should('have.value', optionValue)
            })
        })
        dropdowns.forEach((dropdown) => {
            dropdown.options.forEach((optionValue, index) => {
                cy.get(`${dropdown.id} > option`).eq(index).should('contain.text', optionValue.toUpperCase())
            })
        })
    })

    it('Checkbox', ()=>{
        cy.get('h2').contains('Checkboxe(s)')
        cy.get('input[type=checkbox]').each(($checkButton)=>{
            cy.wrap($checkButton).check().should('be.checked')
            cy.wrap($checkButton).uncheck().should('not.be.checked')
        })
    })

    it('Radio Button', ()=>{
        cy.get('h2').contains('Radio Button(s)')
        cy.get('input[name=color]').each(($radioButton)=>{
            cy.wrap($radioButton).check().should('be.checked')
            cy.get('input[name=color]').not($radioButton).should('not.be.checked')
        })
    })
})