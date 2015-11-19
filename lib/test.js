var loop = function(){
  var _ = require('lodash');
  var fsx = require('fs-extra');
  var Result = require('./generate-result');

  var webdriver = require('selenium-webdriver');
  var By = webdriver.By;
  var until = webdriver.until;

  var log = [];
  var index;
  var config;
  var browserDriver = global.browser;

  try{
    config = require(process.cwd()+'/config');
  }catch($e){
    return console.log($e.message);
  }
  var startLoad, finishLoad;
  var startExecution, finishExecution;
  var driver;

  var data;

  function beforeOpenBrowser(browser){
    driver = new webdriver
      .Builder()
      .forBrowser(browser)
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

  /*function runTest(data,callback){
    var obj = pop(data);
    if(obj){
      test(obj,callback)
    }else{
      console.log(log)
    }
  }*/

  function pop(obj) {
    for (var key in obj) {
      if (!Object.hasOwnProperty.call(obj, key)) continue;
      var result = obj[key];
      // If the property can't be deleted fail with an error.
      if (!delete obj[key]) { throw new Error(); }
      return result;
    }
  }

  function fillInputs(input){
    _.forEach(input,function(n,key){
      driver.findElement({'css':key}).sendKeys(n)
    })
  }

  function printInput(input){
    console.log("  "+index+".) ");
    console.log("    Inputs : ");
    _.forEach(input,function(n,key){
      console.log("     "+key+" : "+n)
    })
    console.log("");
  }

  function printResult(assertionStatus){
    console.log("   Results : ")
    console.log("     "+assertionStatus)
  }

  function test(inputs,callback){
    var input = inputs.pop()
    if(typeof input == 'object'){
      printInput(input.value);
      beforeOpenBrowser(global.browserDriver);
      driver.navigate().to(config.url).then(function(){
        var singleLog = {};
        singleLog.input = input.value;
        afterBrowserOpened()
        singleLog.load = finishLoad-startLoad;
        before()
        var assertionStatus = false;
        if(input.value){
          var output = new Result(input.value,config);
          callback(driver,input.value,output,assertionStatus)
        }else{
          callback(driver,assertionStatus)
        }
        after();
        singleLog.exec = finishExecution-startExecution;
        var quit = driver.quit();
        quit.then(function(){
          printResult(assertionStatus);
          singleLog.result = assertionStatus;
          log.push(singleLog);
          index++
          test(inputs,callback)
        },function(err){
          console.log(err);
        })
      },function(err){
        console.log(err)
      });
    }else{
      fsx.writeJson(process.cwd()+'/log/'+config.browser+'.json', log, function (err) {
        if (err) return console.error(err)
        console.log('')
        console.log('Test has been finished, you can see the report at log file')
      })
    }
  }

  function run(inputs,callback){
    index = 1;
    test(inputs,callback)
  }

  return {
    'run':run,
    'fillInputs':fillInputs
  }
}

module.exports = loop();
