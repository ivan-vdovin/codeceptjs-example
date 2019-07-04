exports.config = {
  tests: './*_test.js',
  output: './output',
  helpers: {
    Puppeteer: {
      url: 'https://www.tinkoff.ru',
      show: false,
      waitForNavigation: 'networkidle0',
      smartWait: 5000,
      waitForAction: 2000
    }
  },
  include: {
    serviceProvidersPage: './pages/ServiceProviders.js',
    paymentsPage: './pages/Payments.js',
  },
  plugins: {
    allure: {
      enabled: true,
    },
    autoDelay: {
      enabled: true
   }
  },
  bootstrap: null,
  mocha: {},
  name: 'CodeceptExample'
}
