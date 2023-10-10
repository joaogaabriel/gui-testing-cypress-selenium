describe('orders', () => {
  beforeEach(() => {
    cy.visit('/admin');
    cy.get('[id="_username"]').type('sylius');
    cy.get('[id="_password"]').type('sylius');
    cy.get('.primary').click();
  });
  // Remove .only and implement others test cases!
  it.only('details of an order shows correct values', () => {
    // Click in orders in side menu
    cy.clickInFirst('a[href="/admin/orders/"]');
    // Type in value input to search for specify order
    cy.get('[id="criteria_total_greaterThan"]').type('500');
    // Click in filter blue button
    cy.get('*[class^="ui blue labeled icon button"]').click();
    // Click in details of the remain order
    cy.clickInFirst('*[class^="ui labeled icon button "]');

    // Assert that details page shows important informations
    cy.get('body').should('contain', 'Order total').and('contain', 'Payments').and('contain', 'Shipments').and('contain', 'Customer since').and('contain', 'Shipping');
  });
  it('test case 2', () => {
    cy.clickInFirst('a[href="/admin/orders/"]');
    cy.get('.orders-list').should('be.visible');
  });
  it('test case 3', () => {
    cy.clickInFirst('a[href="/admin/orders/"]');
    cy.get('[id="criteria_total_greaterThan"]').type('1000');
    cy.get('*[class^="ui blue labeled icon button"]').click();
    cy.get('.order-item').should('have.length.gte', 1);
  });

  t('test case 4', () => {
    // Implement a test for checking if the order list is sorted correctly
    cy.clickInFirst('a[href="/admin/orders/"]');
    cy.get('.order-item').should('have.length.gt', 1);
    cy.get('.order-total').then(($orderTotals) => {
      const orderTotalValues = $orderTotals.map((_, el) => Cypress.$(el).text()).get().map(parseFloat);
      const sortedOrderTotalValues = [...orderTotalValues].sort((a, b) => a - b);
      expect(orderTotalValues).to.deep.equal(sortedOrderTotalValues);
    });
  });

  it('test case 5', () => {
    // Implement a test for filtering orders by status
    cy.clickInFirst('a[href="/admin/orders/"]');
    cy.get('[id="criteria_status"]').select('Shipped'); // Change the status
    cy.get('*[class^="ui blue labeled icon button"]').click();
    cy.get('.order-status').should('contain', 'Shipped');
  });

  it('test case 6', () => {
    // Implement a test for verifying order creation functionality
    cy.clickInFirst('a[href="/admin/orders/"]');
    cy.get('.create-order-button').click();
    // Fill out the order creation form and submit
    cy.get('[id="order_customer"]').type('John Doe');
    cy.get('[id="order_total"]').type('750');
    cy.get('.create-order-submit-button').click();
    // Verify the success message or check if the new order appears in the list
    cy.get('.success-message').should('contain', 'Order created successfully');
  });

  it('test case 7', () => {
    // Implement a test for updating an order's details
    cy.clickInFirst('a[href="/admin/orders/"]');
    // Locate and click on an order to edit
    cy.get('.order-item:first').click();
    // Modify order details and save
    cy.get('[id="order_total"]').clear().type('900');
    cy.get('.update-order-submit-button').click();
    // Verify the success message or check if the updated order details are displayed
    cy.get('.success-message').should('contain', 'Order updated successfully');
  });

  it('test case 8', () => {
    // Implement a test for deleting an order
    cy.clickInFirst('a[href="/admin/orders/"]');
    // Locate and click on an order to delete
    cy.get('.order-item:first').click();
    cy.get('.delete-order-button').click();
    // Confirm the deletion in the modal
    cy.get('.delete-order-confirm-button').click();
    // Verify the success message or check if the order is removed from the list
    cy.get('.success-message').should('contain', 'Order deleted successfully');
  });

  it('test case 9', () => {
    // Implement a test for exporting orders to a CSV file
    cy.clickInFirst('a[href="/admin/orders/"]');
    cy.get('.export-orders-button').click();
    // Confirm the export action in the modal
    cy.get('.export-orders-confirm-button').click();
    // Verify that the CSV file is generated and can be downloaded
    cy.get('.download-csv-button').should('be.visible');
  });

  it('test case 10', () => {
    // Implement a test for checking if order details page is accessible via a direct link
    cy.visit('/admin/orders/1'); // Replace "1" with a valid order ID
    // Verify that the order details page is loaded correctly
    cy.get('body').should('contain', 'Order total').and('contain', 'Payments').and('contain', 'Shipments').and('contain', 'Customer since').and('contain', 'Shipping');
  });
});
