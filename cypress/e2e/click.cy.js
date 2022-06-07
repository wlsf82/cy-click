describe('click.cy.js', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  context('Only clicks on existing, visible and/or enabled buttons', () => {
    it('"Click me" button', () => {
      cy.contains('button', 'Click me')
        .should('be.visible') // https://docs.cypress.io/guides/core-concepts/retry-ability#Why-are-some-commands-NOT-retried
        .click()

      cy.contains('p', 'Yo!').should('be.visible')
    })

    it('"Hey, click me too!" button', () => {
      cy.contains('button', 'click me too')
        .should('exist') // This is an extra assertion, but the code should work without it
        .click() // on.cypress.io/interacting-with-elements

      cy.contains('p', 'Yo!').should('be.visible')
    })

    it('"Try me" button', () => {
      cy.contains('button', 'Try me')
        .should('be.enabled') // This is an extra assertion, but the code should work without it
        .click()

      cy.contains('p', 'Yo!').should('be.visible')
    })
  })

  context("Forces click before the button's visibility", () => {
    it('"Click me" button - force: true', () => {
      cy.contains('button', 'Click me')
        .click({ force: true })

      cy.contains('p', 'Yo!').should('be.visible')
    })
  })

  context('Forces click while the button is disabled', () => {
    it('"Try me" button - force: true', () => {
      cy.contains('button', 'Try me')
        .click({ force: true })

      cy.contains('p', 'Yo!').should('not.be.visible')
    })
  })

  context('Clicks on the button through its icon', () => {
    it('🏠 button', () => {
      cy.get('#home').click() // https://docs.cypress.io/guides/core-concepts/interacting-with-elements#Covering

      cy.contains('p', 'Yo!').should('be.visible')
    })
  })
})
