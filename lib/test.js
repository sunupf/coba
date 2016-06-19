// TODO
// get config
// loop based on browser that specified
// read provided data
// loop n(data) times
  // open Url
  // record time when loaded
  // insert specified input
  // do custom scenario that specified by user in config.scenarion
  // submit action
  // record time when success/fail
// save the record to json file
// show the result in pretier format

var Test = function(config){
  this.config = config;
  this.startTime = 0;
  this.loadTime - 0;
  this.endTime = 0;
  this.webdriver = require('webdriver-sync');
  this.By = this.webdriver.By
  this._ = require('lodash');
  this.driver = 0;

  // console.log(this.config);
}

Test.prototype.showConfig = function () {
  console.log(this.config);
};


Test.prototype.initiateDriver = function () {
  console.log("initiate");
  if (this.config.browser == "firefox") {
    console.log("firefox")
    var FirefoxDriver = this.webdriver.FirefoxDriver;
    this.driver = new FirefoxDriver();
  }else if (this.config.browser == "chrome") {
    console.log("chrome");
    var ChromeDriver = this.webdriver.ChromeDriver;
    this.driver = new ChromeDriver();
  }else if (this.config.browser == "ie") {
    console.log("Internet Explorer");
    var IEDriver = this.webdriver.InternetExplorerDriver;
    this.driver = new IEDriver();
  }else if (this.config.browser == "phantomjs") {
    console.log("Phantom JS");
    var PhantomJSDriver = this.webdriver.PhantomJSDriver;
    this.driver = new PhantomJSDriver();
  }
};

Test.prototype.openBrowser = function () {
  this.startTime = new Date()
  this.driver.get(this.config.url)
  this.loadTime = new Date();
};

Test.prototype.fillInputForm = function (inputs) {
  var tempDriver = this.driver
  var tempBy = this.By
  this._.each(inputs,function(input,index){
    tempDriver.findElement(tempBy.cssSelector(index)).sendKeys(input);
    // webdriver.wait(function() {
    //   return driver.findElements(webdriver.By.cssSelector('.thumbnail').length > 0;
    // }, { timeout: 1000, period: 100 });
  })
};

Test.prototype.start = function () {
  this.startTime = new Date();
  this.initiateDriver();
  this.openBrowser()
};


Test.prototype.stop = function (date) {
  this.endTime = date;
  console.log("Load time = "+(this.loadTime - this.startTime ) / 1000);
  console.log("Execution time = "+(this.endTime - this.loadTime ) / 1000);

  this.driver.quit();
};



module.exports = Test
