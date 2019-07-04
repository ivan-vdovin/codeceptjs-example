const { I } = inject();

module.exports = {
  firstProvider: locate('//*[@id="search-and-pay-container"]/div[2]/div[2]/div/form/div[3]/div/div/div/div[2]/div/div/div/div/div[1]/div/div[1]/div[1]').as('"Первый провайдер"'),
}
