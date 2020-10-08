describe('project', () => {
  it('should be accessible from the index page', () => {
    cy.visit('/')
    cy.findByText('Forest').click()
    cy.location('pathname').should('eq', '/forest')
  })

  it('should contain title, date, tags', () => {
    cy.visit('/forest/')
    cy.location('pathname').should('eq', '/forest/')
    cy.findByText('Forest')
    cy.findByText('07.04.2019')
    cy.findByText('Nature')
  })

  it('should have working back to home link', () => {
    cy.visit('/forest')
    cy.findByAltText(/Back to home/i).click()
    cy.location('pathname').should('eq', '/')
  })
})
