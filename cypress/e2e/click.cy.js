describe('click.cy.js', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  context('Only clicks on existing, visible and/or enabled buttons', () => {
    it('"Click me" button', () => {
      cy.contains('button', 'Click me')
        .should('be.visible')
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

  context('Forces click before button visibility', () => {
    it('"Click me button" - force: true', () => {
      cy.contains('button', 'Click me')
        .click({ force: true })

      cy.contains('p', 'Yo!').should('be.visible')
    })
  })
})
