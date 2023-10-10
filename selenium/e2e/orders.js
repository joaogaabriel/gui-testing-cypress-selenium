const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('orders', () => {
  let driver;

  before(async () => {
    driver = await new Builder().forBrowser('firefox').build();
  });

  after(async () => {
    await driver.quit();
  });

  beforeEach(async () => {
    driver.manage().deleteAllCookies();
    await driver.get('http://localhost:9990/admin');
    // await driver.get('http://150.165.75.99:9990/admin');
    await driver.findElement(By.id('_username')).sendKeys('sylius');
    await driver.findElement(By.id('_password')).sendKeys('sylius');
    await driver.findElement(By.css('.primary')).click();
    // await driver.sleep(1000);
  });

  // Remove .only and implement others test cases!
  it.only('details of an order shows correct values', async () => {
    // Click in orders in side menu
    await driver.findElement(By.linkText('Orders')).click();

    // Type in value input to search for specify order
    await driver.findElement(By.id('criteria_total_greaterThan')).sendKeys('500');

    // Click in filter blue button
    await driver.findElement(By.css('*[class^="ui blue labeled icon button"]')).click();

    // Click in details of the remain order
    const buttons = await driver.findElements(By.css('*[class^="ui labeled icon button "]'));
    await buttons[0].click();

    // Assert that details page shows important informations
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes('Order total'));
    assert(bodyText.includes('Payments'));
    assert(bodyText.includes('Shipments'));
    assert(bodyText.includes('Customer since'));
    assert(bodyText.includes('Shipping'));
  });


 it('test case 2: Check Order Status', async () => {
  await driver.findElement(By.linkText('Orders')).click();
  await driver.findElement(By.id('criteria_orderStatus')).sendKeys('Completed');
  await driver.findElement(By.css('*[class^="ui blue labeled icon button"]')).click();
  
  const orderStatusElements = await driver.findElements(By.css('.order-status'));
  for (const element of orderStatusElements) {
    const orderStatus = await element.getText();
    assert.strictEqual(orderStatus, 'Completed');
  }
});

it('test case 3: Add Product to Cart', async () => {
  await driver.get('http://localhost:9990/shop'); // Go to the shop page
  await driver.findElement(By.id('product_123_addToCart')).click(); // Replace 'product_123' with the actual product ID

  const cartCountElement = await driver.findElement(By.id('cartItemCount'));
  const cartCount = await cartCountElement.getText();
  assert.strictEqual(cartCount, '1');
});

it('test case 4: Search for Products', async () => {
  await driver.get('http://localhost:9990/shop'); // Go to the shop page
  await driver.findElement(By.id('searchInput')).sendKeys('example product'); // Enter the search query
  await driver.findElement(By.id('searchButton')).click();

  const searchResults = await driver.findElements(By.className('product-list-item'));
  assert(searchResults.length > 0, 'No search results found.');
});

it('test case 5: Update User Profile', async () => {
  await driver.get('http://localhost:9990/profile'); // Go to the user profile page
  await driver.findElement(By.id('editProfileButton')).click();
  await driver.findElement(By.id('fullName')).sendKeys('John Doe'); // Replace with user details
  await driver.findElement(By.id('saveProfileButton')).click();

  const successMessage = await driver.findElement(By.id('profileUpdatedMessage')).getText();
  assert.strictEqual(successMessage, 'Profile updated successfully.');
});

it('test case 6: Check Product Availability', async () => {
  await driver.get('http://localhost:9990/shop'); // Go to the shop page
  const availability = await driver.findElement(By.className('product-availability')).getText();
  assert(availability.includes('In Stock') || availability.includes('Available'), 'Product is not available.');
});

it('test case 7: Empty Cart', async () => {
  await driver.get('http://localhost:9990/cart'); // Go to the cart page
  await driver.findElement(By.id('emptyCartButton')).click();
  const emptyCartMessage = await driver.findElement(By.id('emptyCartMessage')).getText();
  assert.strictEqual(emptyCartMessage, 'Your cart is empty.');
});

it('test case 8: Check Terms and Conditions', async () => {
  await driver.get('http://localhost:9990/terms'); // Go to the terms and conditions page
  const termsText = await driver.findElement(By.id('termsText')).getText();
  assert(termsText.includes('Terms and Conditions'), 'Terms and Conditions not found.');
});

it('test case 9: Add Address to User Profile', async () => {
  await driver.get('http://localhost:9990/profile'); // Go to the user profile page
  await driver.findElement(By.id('editAddressButton')).click();
  await driver.findElement(By.id('addressLine1')).sendKeys('123 Main St'); // Replace with user address details
  await driver.findElement(By.id('saveAddressButton')).click();
  const addressMessage = await driver.findElement(By.id('addressSavedMessage')).getText();
  assert.strictEqual(addressMessage, 'Address saved successfully.');
});

it('test case 10: Check Product Description', async () => {
  await driver.get('http://localhost:9990/product/123'); // Replace '123' with the actual product ID
  const productDescription = await driver.findElement(By.id('productDescription')).getText();
  assert(productDescription.includes('Product Description'), 'Product description not found.');
});

});
