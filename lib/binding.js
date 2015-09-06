var binding = function(){
  var webdriver = require('selenium-webdriver'),
        By = webdriver.By,
        until = webdriver.until;

  var driver = new webdriver.Builder()
    .forBrowser('firefox')
    .build();
  
  function open(url){
    var _this = this;
    driver.get(url).then(function(){
      return _this;
    })
  }
  
  function setValue(selector,value){
    driver.findElement(By.css(selector)).sendKeys(value);
    return this;
  }
  
  function click(selector,value){
    driver.findElement(By.css(selector)).click();
    return this;
  }
  
  function find(selector){
    return driver.findElement(By.css(selector));
  }
  
  function wait(selector,time){
    driver.wait(until.elementsLocated({'css':selector}), time);
    return this;
  }
  
  function quit(){
    driver.close();
    return this;
  }
  
  return {
    'open' : open,
    'setValue' : setValue,
    'click' : click,
    'wait' : wait,
    'find' : find,
    'quit' : quit,
  }
}

module.exports = binding()