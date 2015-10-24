var generateResults = function(input,config) {
  var _ = require('lodash');
  var messages = require('../message/message.js');
  var Validator = require('validatorjs');

  var customValidation = require(process.cwd()+'/validation')
  _.forEach(customValidation,function(n,key){
    n(messages.messages,Validator)
  })

  try{
    var customMessage = require(process.cwd()+'/message');
    _.forEach(customMessage,function(n,key){
      messages.setMessage(key,n);
    })
  }catch(e){
    // return console.log($e.message);
  }

  var validation = {};
  var _input = {}
  var output = []
  _.forEach(input, function(n,key){
    var inputConfig = _.filter(config.input, { 'selector': key })
    inputConfig = inputConfig[0]
    _input[inputConfig.name] = n
    validation[inputConfig.name] =inputConfig.validation
  })

  var validationResult = new Validator(_input,validation,messages.messages);

  _.forEach(validationResult.errors,function(n,key){
    output.push(n)
  })
  return _.flatten(output,true)

}

module.exports = generateResults
