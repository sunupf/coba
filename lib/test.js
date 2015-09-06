var loop =function(){
  var _ = require('lodash');
  var bind = require('./binding');
  var types = require('./variabel').types

  function test(url,input,callback){
    _.forEach(types,function(type,i){
      _.forEach(input[type],function(obj,key){
        // start loging
        var startLoad = new Date();
        bind.open(url);
        // stop loging
//        var finishLoad = new Date();
//        var loadTime = (finishLoad-startLoad)
//        console.log(loadTime+" ms")
        
        // start loging
        var startExecution = new Date();
        callback(obj,function(){
          // stop loging
          var finishExecution = new Date();
//          var executionTime = (finishExecution-startExecution);
          var executionTime = (finishExecution-startLoad);
          console.log(executionTime+" ms")
          console.log("-----------")
          bind.quit();
        });
      });
    });
  }

  return {
    'test':test
  }
}

module.exports = loop();