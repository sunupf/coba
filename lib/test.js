var loop =function(){
  var _ = require('lodash');
  var bind = require('./binding');

  function test(url,input,callback){
    _.forEach(input,function(obj,key){
      bind.open(url);
      callback(obj);
    });
  }

  return {
    'test':test
  }
}

module.exports = loop();