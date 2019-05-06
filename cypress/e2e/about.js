describe('about', () => {
  it('should be accessible from home page', () => {
    cy.visit('/')
      .getByText('About me')
      .click()
      .assertRoute('/about')
  })

  it('contains expected content', () => {
    cy.visit('/about')
      .getByText(/hello/i)
      .getByText(/drop me an email/i)
      .getByText(/linkedin profile/i)
      .getByText(/github profile/i)
      .getByText(/500px profile/i)
  })

  it('should have working back to home link', () => {
    cy.visit('/about')
      .getByAltText(/Back to home/i)
      .click()
      .assertRoute('/')
  })
})
