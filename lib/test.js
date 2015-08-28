
var loop =function(){
  var _ = require('lodash');
  var bind = require('./binding');
  var types = require('./variabel').types

  function test(url,input,callback){
    _.forEach(types,function(type,i){
      _.forEach(input[type],function(obj,key){
//        bind.open(url);
//        callback(obj,function(){
          console.log('after test')
//        });
      });
      console.log('after test types');
    });
  }

  return {
    'test':test
  }
}

module.exports = loop();