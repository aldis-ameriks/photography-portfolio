describe('project', () => {
  it('should be accessible from the index page', () => {
    cy.visit('/')
      .getByText(/Forest/i)
      .click()
      .assertRoute('/forest')
  })

  it('should contain title, date, tags', () => {
    cy.visit('/forest')
      .getByText(/Forest/i)
      .getByText(/07.04.2019/i)
      .getByText(/Photography/i)
  })

  it('should have working back to home link', () => {
    cy.visit('/forest')
      .getByAltText(/Back to home/i)
      .click()
      .assertRoute('/')
  })
})
