var helper =function(){
  var _ = require('lodash');
  var bind = require('./binding');

  function fillInputField(input){
    _.forEach(input,function(element,key){
      bind
        .setValue(key,element.value)
    })
  }

  return {
    'fillInputField':fillInputField
  }
}

module.exports = helper();