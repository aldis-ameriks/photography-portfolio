describe('about', () => {
  it('should be accessible from home page', () => {
    cy.visit('/')
    cy.findByText('About me').click()
    cy.url().should('include', '/about')
  })

  it('contains expected content', () => {
    cy.visit('/about')
    cy.findByText(/hello/i)
    cy.findByText(/drop me an email/i)
    cy.findByText(/linkedin profile/i)
    cy.findByText(/github profile/i)
    cy.findByText(/500px profile/i)
  })

  it('should have working back to home link', () => {
    cy.visit('/about')
    cy.findByAltText(/Back to home/i).click()
    cy.location('pathname').should('eq', '/')
  })
})
