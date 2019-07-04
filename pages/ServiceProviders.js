const { I } = inject();

module.exports = {
  regionButton: locate(".//div[contains(., 'ЖКХ')]//span/span/span").as('"Регион"'),
  provider: locate('li').inside('section').first().as('"Провайдер"'),
  
  //Introduce method to choose a region.
  pickRegion(regionName = 'г. Москва') {
	I.click(this.regionButton);
	I.click(regionName);
  }

}
