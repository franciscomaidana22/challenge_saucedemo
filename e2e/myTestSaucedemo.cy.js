const users = [
    {username: 'standard_user', password: 'secret_sauce'},
    {username: 'problem_user', password: 'secret_sauce'}
]

users.forEach((user)=>{
    describe('Compra en Swag Labs', {testIsolation:false}, ()=>{

        before('Precondiciones para el flujo de pruebas', ()=>{
            cy.clearCookies()
            cy.clearLocalStorage()
            cy.visitValidateTitle('https://www.saucedemo.com/', 'Swag Labs')
            cy.request('GET', 'https://www.saucedemo.com/').then((response)=>{
                expect(response.status).to.equal(200)
                expect(response.headers['content-type']).to.include('text/html; charset=utf-8')
            })
        })

        it('Validar que la página de inicio de sesión funcione correctamente', ()=>{
            cy.typeText('#user-name', user.username)
            cy.typeText('#password', user.password)
            cy.clickVisible('#login-button')
        })

        it('Validar que la página del inventario permita añadir productos al carrito', ()=>{
            cy.url().should('include', '/inventory.html')
            cy.request('GET', 'https://www.saucedemo.com/?/inventory.html').then((response)=>{
                expect(response.status).to.equal(200)
                expect(response.headers['content-type']).to.include('text/html; charset=utf-8')
            })
            cy.fixture('saucedemoInventory').then((inventory)=>{
                cy.get('.inventory_item').each(($item, index)=>{
                    const itemInventory=inventory[`itemInventory${index}`]
                    cy.wrap($item).find('.inventory_item_name').should('contain', itemInventory.name)
                    cy.wrap($item).find('.inventory_item_desc').should('contain', itemInventory.description)
                    cy.wrap($item).find('.inventory_item_price').should('contain', itemInventory.price)
                    cy.wrap($item).find('img.inventory_item_img').should('have.attr', 'alt', itemInventory.img)
                })
            })
            cy.get('.btn_inventory').each(($addToCart, index)=>{
                cy.wrap($addToCart).should('be.visible').click()
                cy.get('.shopping_cart_badge').should('contain', (index+1).toString())
            })
            cy.clickVisible('.shopping_cart_badge')
        })

        it('Validar que los productos estén correctamente añadidos en el carrito', ()=>{
            cy.url().should('include', '/cart.html')
            cy.request('GET', 'https://www.saucedemo.com/?/cart.html').then((response)=>{
                expect(response.status).to.equal(200)
                expect(response.headers['content-type']).to.include('text/html; charset=utf-8')
            })
            cy.fixture('saucedemoInventory').then((inventory)=>{
                cy.get('.cart_item').each(($item, index)=>{
                    const itemInventory=inventory[`itemInventory${index}`]
                    cy.wrap($item).find('.inventory_item_name').should('contain', itemInventory.name)
                    cy.wrap($item).find('.inventory_item_desc').should('contain', itemInventory.description)
                    cy.wrap($item).find('.inventory_item_price').should('contain', itemInventory.price)
                })
            })
            cy.clickVisible('#checkout')
        })

        it('Validar el ingreso de datos solicitados', ()=>{
            cy.url().should('include', '/checkout-step-one.html')
            cy.request('GET', 'https://www.saucedemo.com/?/checkout-step-one.html').then((response)=>{
                expect(response.status).to.equal(200)
                expect(response.headers['content-type']).to.include('text/html; charset=utf-8')
            })
            cy.fixture('genericUse').then((checkoutData)=>{
                cy.typeText('#first-name', checkoutData.firstName)
                cy.typeText('#last-name', checkoutData.lastName)
                cy.typeText('#postal-code', checkoutData.postalCode)
            })
            cy.clickVisible('#continue')
        })

        it('Validar productos y finalizar compra', ()=>{
            cy.url().should('include', '/checkout-step-two.html')
            cy.request('GET', 'https://www.saucedemo.com/?/checkout-step-two.html').then((response)=>{
                expect(response.status).to.equal(200)
                expect(response.headers['content-type']).to.include('text/html; charset=utf-8')
            })
            cy.fixture('saucedemoInventory').then((inventory)=>{
                cy.get('.cart_item').each(($item, index)=>{
                    const itemInventory=inventory[`itemInventory${index}`]
                    cy.wrap($item).find('.inventory_item_name').should('contain', itemInventory.name)
                    cy.wrap($item).find('.inventory_item_desc').should('contain', itemInventory.description)
                    cy.wrap($item).find('.inventory_item_price').should('contain', itemInventory.price)
                })
            })
            cy.clickVisible('#finish')
        })
        
        it('Validar el aviso del checkout completado', ()=>{
            cy.url().should('include', '/checkout-complete.html')
            cy.request('GET', 'https://www.saucedemo.com/?/checkout-complete.html').then((response)=>{
                expect(response.status).to.equal(200)
                expect(response.headers['content-type']).to.include('text/html; charset=utf-8')
            })
            cy.get('.pony_express').should('be.visible')
            cy.validateText('.complete-header', 'Thank you for your order!')
            cy.validateText('.complete-text', 'Your order has been dispatched, and will arrive just as fast as the pony can get there!')
        })

        it('Validar cierre de sesión desde el menú desplegable', ()=>{
            cy.clickVisible('#react-burger-menu-btn')
            cy.clickVisible('#logout_sidebar_link')
            cy.url().should('eq', 'https://www.saucedemo.com/')
        })

    })
})