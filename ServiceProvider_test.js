
Feature('Service provider regional division');

/* global assert, output */
const assert = require('assert');
const output = require('codeceptjs').output;

/* global provider */
var provider;

Before((I) => {
  I.amOnPage('/');
  I.say("Let's open payments page");
  I.click('Платежи');
});

Scenario('make sure that provider belongs to MSK region and check warnings', async (I, serviceProvidersPage) => {
  I.say("Let's open service providers page");
  I.click('ЖКХ');
  I.seeElement(serviceProvidersPage.regionButton);

  I.say("Let's check if Moscow region is choosen");
  const region = await I.grabAttributeFrom(serviceProvidersPage.regionButton, 'aria-label');
  output.print('Region: ' + region);
  if (region !== 'Москве') {
    serviceProvidersPage.pickRegion();
  };

  I.say("Let's check if required provider is on the first place of the list");
  provider = await I.grabTextFrom(serviceProvidersPage.provider);
  I.click(provider);
  I.click('Оплатить ЖКУ в Москве');

  I.say("Let's check error message for all required fields");
  I.fillField('Код плательщика за ЖКУ в Москве', '999');
  I.click('Оплатить ЖКУ в Москве');
  I.see('Поле неправильно заполнено');

  I.fillField('За какой период оплачиваете коммунальные услуги', '21.0001');
  I.click('Оплатить ЖКУ в Москве');
  I.see('Поле заполнено некорректно');

  I.see('Сумма платежа');
  I.fillField('Сумма платежа', '*-+()/');
  I.click('Оплатить ЖКУ в Москве');
  I.see('Поле заполнено неверно');
});

Scenario('make sure that search returns expected provider ', async (I, paymentsPage) => {
  I.fillField('Поиск по платежам', provider);

  I.say("Let's check a name of the first search results");
  foundProvider = await I.grabTextFrom(paymentsPage.firstProvider);
  assert.equal(foundProvider, provider);
  I.click(paymentsPage.firstProvider);

  I.say("Let's check if page address is correct");
  I.seeCurrentUrlEquals('/zhku-moskva/');
});

Scenario('make sure that provider does not belong to SPB region', async (I, serviceProvidersPage) => {
  I.say("Let's open service providers page");
  I.click('ЖКХ');

  I.say("Let's pick another region");
  serviceProvidersPage.pickRegion('г. Санкт-Петербург');  

  I.say("Let's make sure that provider is not displayed");
  I.dontSee(provider);
  I.dontSeeElement(provider);
});
