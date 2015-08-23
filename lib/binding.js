var binding = function(){
  var webdriver = require('selenium-webdriver'),
        By = webdriver.By,
        until = webdriver.until;

  var driver = new webdriver.Builder()
    .forBrowser('firefox')
    .build();
  
  function open(url){
    driver.get(url);
    return this;
  }
  
  function setValue(selector,value){
    driver.findElement(By.css(selector)).sendKeys(value);
    return this;
  }
  
  function click(selector,value){
    driver.findElement(By.css(selector)).click();
    return this;
  }
  
  function wait(selector,time){
    driver.wait(until.elementsLocated({'css':selector}), time);
    return this;
  }
  
  return {
    'open' : open,
    'setValue' : setValue,
    'click' : click,
    'wait' : wait,
  }
}

module.exports = binding()