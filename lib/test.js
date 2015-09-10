var loop =function(){
  var _ = require('lodash');
  var fsx = require('fs-extra');
  
  var webdriver = require('selenium-webdriver');
  var By = webdriver.By;
  var until = webdriver.until;
  
  var log = [];
  
  var config;
  
  try{
    config = require(process.cwd()+'/config');
  }catch($e){
    return console.log($e.message);
  }
  var startLoad, finishLoad;
  var startExecution, finishExecution;
  var driver;
  
  var data;
    
  function beforeOpenBrowser(){
    driver = new webdriver
      .Builder()
      .forBrowser('firefox')
      .usingServer('http://localhost:4444/wd/hub')
      .build();
    startLoad = new Date();
  }
  
  function afterBrowserOpened(){
    finishLoad = new Date();
  }
  
  function before(){
    startExecution = new Date();
  }
  
  function after(){
    finishExecution = new Date();
  }
  
  function runTest(data,callback){
    var obj = pop(data);
    if(obj){
      test(obj,callback)
    }else{
      console.log(log)
    }
  }
  
  function pop(obj) {
    for (var key in obj) {
      if (!Object.hasOwnProperty.call(obj, key)) continue;
      var result = obj[key];
      // If the property can't be deleted fail with an error.
      if (!delete obj[key]) { throw new Error(); }
      return result;
    } 
  }
  
  function test(inputs,callback){
    var input = inputs.pop()
    if(typeof input == 'object'){
      beforeOpenBrowser();
      driver.navigate().to(config.url).then(function(){
        var singleLog = {};
        singleLog.input = input;
        
        afterBrowserOpened()
        singleLog.load = finishLoad-startLoad;
        before()
        callback(driver)
        after();
        singleLog.exec = finishExecution-startExecution;
        var quit = driver.quit();
        quit.then(function(){
          log.push(singleLog);
          test(inputs,callback)
        },function(err){
          console.log(err);
        })
      },function(err){
        console.log(err)
      });      
    }else{
      runTest(data,callback);
    }
  }
  
  function run(inputs,callback){
    test(inputs,callback)
  }

  return {
    'run':run
  }
}

module.exports = loop();