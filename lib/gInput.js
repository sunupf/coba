var _ = require('lodash');
var g = require('randexp');
var faker = require('faker');
var types = require('./variabel').types
var normalTestCase= 10;

var gInput = {
  'getCombinations':function(chars) {
    var result = [];
    var f = function(prefix, chars) {
      for (var i = 0; i < chars.length; i++) {
        var p = prefix+(JSON.stringify(chars[i]))+",";
        result.push("["+p.slice(0,-1)+"]");
        f(p, chars.slice(i + 1));
      }
    }
    f('', chars);
    result.push('{}')
    return result;
  },
  'generateInputRecord':function (data){
    var _this = this;
    var gInput = {}
    _.forEach(types,function(type,key){
      gInput[type] = [];
      switch(type){
        case 'normal':
          var input;
          for(i=0;i<normalTestCase;i++){
            input = {}
            _.forEach(data,function(n,key){
              input[n.selector] = _this.generateByType(n.type)
            })
            gInput[type].push(input);
          }
          break;
        case 'null':
          var combinations = _this.getCombinations(data);
          _.forEach(combinations,function(n,key){
            var el = JSON.parse(n)
            var input = _this.generateInput(el)
            gInput[type].push(input);  
          })
          var sort =_.sortByOrder(gInput[type],function(n){
            return _.size(n);
          },'asc');
          sort.splice((sort.length-1),1);
          gInput[type] = sort;
          break;
      }
    })
    return gInput;    
  },
  'generateInput':function (data){
    var _this = this;
    var arrayOfInput = {}
    _.forEach(data,function(input,key){
      arrayOfInput[input.selector] = _this.generateByType(input.type)
      /*arrayOfInput['value'][input.selector].type = input.type;*/
    })
    return arrayOfInput;
  },
  'generateByType':function(inputType){
    switch(inputType){
      case 'email' : 
        return {
          'value':faker.internet.email()
        }
        break;
      case 'name' : 
        return {
          'value':faker.name.findName()
        }
        break;
      case 'password' : 
        return {
          'value':faker.internet.password()
        }
        break;
      case 'string' : 
        return {
          'value':new g(/^[a-z]+$/i).gen()
        }
        break;
    }
  }
}

module.exports = gInput;