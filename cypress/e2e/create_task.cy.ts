describe('Creating a task', () => {
  it('Displays the todo list', () => {
    const taskTitle = 'finish the test case' + Date.now()

    cy.visit('/')

    cy.get("[data-testid='taskTitle']").type(taskTitle)

    cy.get("[data-testid='createButton']").click()

    cy.get("[data-testid='taskTitle']").should('have.value', '')

    cy.get("[data-testid='taskList']").contains(taskTitle)
  })
})
