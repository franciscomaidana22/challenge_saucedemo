describe ('loginTest', () => {

    beforeEach ( () => {
        cy.visit ('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    });

    it ('should login with valid credentials', () => {
        cy.fixture ('users') .then ((users) => {
            cy.get ('input[name=username]') .type (users.validUser.username);
            cy.get ('input[name=password]') .type (users.validUser.password);
            cy.get ('.oxd-button') .click ();
            cy.url () .should ('include', '/dashboard');
        });
    });

    it ('should fail login with invalid credentials', () => {
        cy.fixture ('users') .then ((users) => {
            cy.get ('input[name=username]') .type (users.invalidUser.username);
            cy.get ('input[name=password]') .type (users.invalidUser.password);
            cy.get ('.oxd-button') .click ();
            cy.get ('.oxd-alert-content') .should ('contain', 'Invalid credentials');
        });
    });
});