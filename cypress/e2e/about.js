describe('about', () => {
  it('should be accessible from home page', () => {
    cy.visit('/')
      .findByText('About me')
      .click()
      .assertRoute('/about')
  })

  it('contains expected content', () => {
    cy.visit('/about')
      .findByText(/hello/i)
      .findByText(/drop me an email/i)
      .findByText(/linkedin profile/i)
      .findByText(/github profile/i)
      .findByText(/500px profile/i)
  })

  it('should have working back to home link', () => {
    cy.visit('/about')
      .findByAltText(/Back to home/i)
      .click()
      .assertRoute('/')
  })
})
