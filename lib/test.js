var By = require('selenium-webdriver').By,
    until = require('selenium-webdriver').until,
    webdriver = require('selenium-webdriver'),
    test = require('selenium-webdriver/testing');

test.describe('Google Search', function() {
  var config;
  try{
    config = require(process.cwd()+'/config');
  }catch($e){
    return console.log($e.message);
  }
  var startLoad, finishLoad;
  var startExecution, finishExecution;

  var driver;

  function beforeOpenBrowser(browser){
    driver = new webdriver
      .forBrowser(browser)
      .Builder()
      .usingServer('http://localhost:4444/wd/hub')
      .build();
    startLoad = new Date();
  }

  function afterBrowserOpened(){
    finishLoad = new Date();
  }

  test.beforeEach(function() {
    beforeOpenBrowser(global.browserDriver);
    driver.navigate().to(config.url).then(function(){
      console.log(finishLoad-startLoad);
      afterBrowserOpened();
    });
  });

  test.afterEach(function() {
    driver.quit();
  });

  test.it('should append query to title', function() {
    //TODO :
    //require test.js over here

  });
});
