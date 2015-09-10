var helper =function(_driver){
  var _ = require('lodash');
  var webdriver = require('selenium-webdriver'),
      By = webdriver.By,
      until = webdriver.until;
  
  var driver = _driver;

//  function fillInputField(key,value){
//    driver.findElement(By.css(key)).sendKeys(element.value);
//  }
//  
//  function fillInputFields(input,_driver){
//    driver = _driver;
//    _.forEach(input,function(element,key){
//      fillInputField(key,element.value);
//    })
//  }
//
//  return {
//    'fillInputFields':fillInputFields
//  }
}

module.exports = helper();

