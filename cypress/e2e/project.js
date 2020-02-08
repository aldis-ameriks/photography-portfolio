describe('project', () => {
  it('should be accessible from the index page', () => {
    cy.visit('/')
      .findByText('Forest')
      .click()
      .assertRoute('/forest')
  })

  it('should contain title, date, tags', () => {
    cy.visit('/forest')
      .assertRoute('/forest/')
      .findByText('Forest')
      .findByText('07.04.2019')
      .findByText('Nature')
  })

  it('should have working back to home link', () => {
    cy.visit('/forest')
      .findByAltText(/Back to home/i)
      .click()
      .assertRoute('/')
  })
})
