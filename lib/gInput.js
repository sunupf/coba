var _ = require('lodash');
var g = require('randexp');
var faker = require('faker');
var template = require('template-string');
var Validator = require('validatorjs');
var genData = require('generate-by-validation/generate');
var messages = require('../message/message.js');
var normalTestCase= 10;

var gInput = {
  'objectDifference':function(collection,obj){
    var data = [].concat(collection);
    var data2 = [].concat(obj);

    function diff(n,m){
      var popObj = m.pop();
      if(popObj){
        var idx = _.findIndex(n,popObj);
        if(idx>=0){
          n.splice(idx,1)
        }
        diff(n,m)
      }
    }
    diff(data,data2);
    return data;
  },
  'relation':function(obj){
    var x = []

    var himpunan = function(result,obj){
      var newObj = obj.slice()
      var popObj = newObj.pop();
      var h
      if(popObj){
        for(var i in popObj){
          h = result + popObj[i]+","
          if(newObj.length<1){
            x.push(h.slice(0,1).split(","))
          }else{
            himpunan(h,newObj);
          }
        }
      }
    }

    himpunan("",obj)
    return x;
  },
  'getCombinations':function(chars) {
    var result = [];
    var f = function(prefix, chars) {
      for (var i = 0; i < chars.length; i++) {
        var p = prefix+(JSON.stringify(chars[i]))+",";
        result.push(JSON.parse("["+p.slice(0,-1)+"]"));
        f(p, chars.slice(i + 1));
      }
    }
    f('', chars);
    result.push([])
    return result;
  },
  'generateInputRecord':function (data){
    try{
      customMessage = require(process.cwd()+'/message');
      _.forEach(customMessage,function(n,key){
        messages.setMessage(key,n);
      })
    }catch(e){
      return console.log($e.message);
    }

    var gInput = []

    // normal input
    var normalCase = this.generateNormalTestCase(data);
    gInput = gInput.concat(normalCase);


    // null input
    var combinations = this.getCombinations(data);
    var nullCase = this.generateNullTestCase(combinations);
    gInput = gInput.concat(nullCase);

    // Unallowed input
    var unallowed = this.generateInvalidTestCase(combinations);
    gInput = gInput.concat(unallowed);


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
      input.result = messages.messages.success;
      normalInput.push(input);
    }
    return normalInput;
  },
  'generateNullTestCase':function (data){
    var _this = this;
    var nullInput = [];
    var input;
    var sort =_.sortByOrder(data,function(n){
      return _.size(n);
    },'asc');


    var normal = sort.pop()
    _.forEach(sort,function(n,key){
      var input = _this.generateInput(n)
      if(n.length > 0){
        _nullInput = _this.objectDifference(normal,n)
      }else{
        _nullInput = normal
      }

      _.forEach(_nullInput,function(_n,key){
        var arrayOfValidation = genData.stringToArray(_n.validation);
        if(_.indexOf(arrayOfValidation,'required')>=0){
          var msg = template(messages.messages.required,{'name':_n.name})
          input.result.push(msg)
        }
      })
      nullInput.push(input);
    })

    return nullInput;
  },
  'generateInvalidTestCase':function (data){
    var _this = this;
    var invalidInput = [];
    var sort =_.sortByOrder(data,function(n){
      return _.size(n);
    },'asc');

    sort.splice(0,1);
    var normal = sort[(sort.length-1)]
    _.forEach(sort,function(n,key){
      var _input ={}
      var validationRule ={}
      _input['value'] = {}
      _input['result'] = []
      _.forEach(n,function(_n,key){
        var validation = _n.validation.replace("required","");
        var data = genData.generate(validation,false)
        _input.value[_n.name] = data
        validationRule[_n.name] = _n.validation;
      })
      normalInput = _this.objectDifference(normal,n);
      _.forEach(normalInput,function(_normal,key){
        var data = genData.generate(_normal.validation)
        _input.value[_normal.name] = data
        validationRule[_normal.name] = _normal.validation;
      })

      var validationResult = new Validator(_input.value,validationRule);
      _.forEach(validationResult.errors,function(n,key){
        _input.result.push(n)
      })
      _input.result = _.flatten(_input.result,true)
      invalidInput.push(_input);
    })

    return invalidInput;
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
