describe('click.cy.js', () => {
  beforeEach(() => {
    cy.visit('./index.html')
  })

  context('Only clicks on existing, visible and/or enabled buttons', () => {
    it('"Click me" button', () => {
      cy.contains('button', 'Click me')
        .should('be.visible') // https://docs.cypress.io/guides/core-concepts/retry-ability#Why-are-some-commands-NOT-retried // on.cypress.io/interacting-with-elements
        .click() // show commeting the above line and forcing the click.

      cy.contains('p', 'Yo!').should('be.visible')
    })

    it('"Hey, click me too!" button', () => {
      cy.contains('button', 'click me too')
        .should('exist') // This is an extra assertion, but the code should work without it // This could also be a .should('be.visible')
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

    it('"I\'m, hidden" button - force: true', () => {
      cy.contains('button', "I'm hidden")
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

  context('Shows the button before clicking on it', () => {
    it('"I\'m hidden" button', () => {
      cy.get('#hidden-button')
        .invoke('attr', 'style', 'visibility:visible')
        .find('button')
        .invoke('text', 'I was hidden')
        .click()

      cy.contains('p', 'Yo!').should('be.visible')
    })

    it('"Click me" button', () => {
      cy.get('#not-visible-button')
        .invoke('show')
        .find('button:contains(Click me)')
        .click()

      cy.contains('p', 'Yo!').should('be.visible')
    })
  })
})
