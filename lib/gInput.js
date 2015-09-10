var _ = require('lodash');
var g = require('randexp');
var faker = require('faker');
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
    var gInput = []
    
    // normal input
    var normalCase = this.generateNormalTestCase(data);
    gInput = gInput.concat(normalCase);
    
    
    // null input
    var combinations = this.getCombinations(data);
    var nullCase = this.generateNullTestCase(combinations);
    gInput = gInput.concat(nullCase);
    
    return gInput;    
  },
  'generateNormalTestCase':function (data){
    var _this = this;
    var normalInput = [];
    var input;
    for(i=0;i<normalTestCase;i++){
      input = {'value':{},'result':[]}
      _.forEach(data,function(n,key){
        input.value[n.selector] = _this.generateByType(n.type)
      })
      normalInput.push(input);
    }
    return normalInput;
  },
  'generateNullTestCase':function (data){
    var _this = this;
    var nullInput = [];
    var input;
    _.forEach(data,function(n,key){
      var el = JSON.parse(n)
      var input = _this.generateInput(el)
      nullInput.push(input);  
    })
    
    var sort =_.sortByOrder(nullInput,function(n){
      return _.size(n.value);
    },'asc');
    
    sort.splice((sort.length-1),1);
    return sort;
  },
  'generateInput':function (data){
    var _this = this;
    var arrayOfInput = {}
    arrayOfInput = {'value':{},'result':[]}
    _.forEach(data,function(input,key){
      arrayOfInput.value[input.selector] = _this.generateByType(input.type)
      /*arrayOfInput['value'][input.selector].type = input.type;*/
    })
    return arrayOfInput;
  },
  'generateByType':function(inputType){
    switch(inputType){
      case 'email' : 
        return faker.internet.email()
        break;
      case 'name' : 
        return faker.name.findName()
        break;
      case 'password' : 
        return faker.internet.password()
        break;
      case 'string' : 
        return new g(/^[a-z]+$/i).gen()
        break;
    }
  }
}

module.exports = gInput;