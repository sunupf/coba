var _ = require('lodash');
var g = require('randexp');
var faker = require('faker');

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
    var combinations = _this.getCombinations(data);
    var gInput = []
    _.forEach(combinations,function(n,key){
      var el = JSON.parse(n)
      var input = _this.generateInput(el)
      gInput.push(input);
    })
    return _.sortByOrder(gInput,function(n){
      return _.size(n);
    },'desc');
  },
  'generateInput':function (data){
    var arrayOfInput = {}
    _.forEach(data,function(input,key){
      switch(input.type){
        case 'email' : 
          arrayOfInput[input.type] = faker.internet.email();
          break;
        case 'name' : 
          arrayOfInput[input.type] = faker.name.findName();
          break;
        case 'password' : 
          arrayOfInput[input.type] = faker.internet.password();
          break;
      }
    })
    return arrayOfInput;
  }
}

module.exports = gInput;