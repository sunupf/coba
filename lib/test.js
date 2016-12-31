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
  this.log = [];
  this.result = "";
  this.config = config;
  this.startTime = 0;
  this.loadTime = 0;
  this.reqStartTime = 0;
  this.reqEndTime = 0;
  this.reqTestTime = 0;
  this.startExecTime = 0;
  this.endTime = 0;
  this.webdriver = require('webdriver-sync');
  this.By = this.webdriver.By
  this._ = require('lodash');
  this.driver = 0;
  this.assert = require("chai").assert

  // console.log(this.config);
}

Test.prototype.showConfig = function () {
  console.log(this.config);
};


Test.prototype.initiateDriver = function () {
  // console.log(this.config.browser);
  if (this.config.browser == "firefox") {
    console.log("firefox")
    var FirefoxDriver = this.webdriver.FirefoxDriver;
    this.driver = new GeckoDriver();
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
  }else{
    throw new Error(this.config.browser+" is not browser or not supported yet")
  }
};

Test.prototype.openBrowser = function () {
  this.startTime = new Date()
  this.driver.get(this.config.startingUrl)
  this.loadTime = new Date();
};

Test.prototype.fillInputForm = function (inputs, driver) {
  // console.log(driver)
  var tempBy = this.By
  this._.each(inputs,function(input,index){
    driver.findElement(tempBy.cssSelector(index)).sendKeys(input);
    console.log("input "+index);
    // webdriver.wait(function() {
    //   return driver.findElements(webdriver.By.cssSelector('.thumbnail').length > 0;
    // }, { timeout: 1000, period: 100 });
  })
};

Test.prototype.start = function (data) {
  this.result = data;
  this.initiateDriver();
  this.openBrowser()
};

Test.prototype.startRequiredTest = function (path , obj, data) {
  obj.reqStartTime = new Date();
  // console.log(obj.reqStartTime);
  try{
    require(path)({
      'coba' : obj,
      'data' : data
    });
    obj.reqEndTime = new Date();
  }catch(e){
    // console.log(e.message)
    obj.reqEndTime = obj.reqStartTime;
  }
  // console.log(obj.reqEndTime);
};

Test.prototype.startExecution = function (path , obj, data) {
  obj.startExecTime = new Date();
  require(path)({
    'coba' : obj,
    'data' : data
  });
  obj.stop(new Date())
};


Test.prototype.stop = function (date) {
  this.endTime = date;
  this.result.load = ( this.loadTime - this.startTime ) / 1000;
  this.result.reqTestTime = ( this.reqStartTime - this.reqEndTime ) / 1000;
  this.result.execution = ( this.endTime - this.startExecTime ) / 1000;
  this.log.push(this.result);
  // console.log("Load time = "+(this.loadTime - this.startTime ) / 1000);
  // console.log("Execution time = "+(this.endTime - this.loadTime ) / 1000);

  this.driver.quit();
};

Test.prototype.setAssertionResultValue = function (value) {
  this.result.assertion = value;
};

Test.prototype.isDeeplyEqual = function (actual,expected) {
  try {
    this.assert.deepEqual(actual,expected)
  } catch (e) {
    this.setAssertionResultValue(false)
  } finally {
    this.setAssertionResultValue(true)
  }

  return result;
};



module.exports = Test
