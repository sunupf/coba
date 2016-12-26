var _ = require('lodash');
var pattern = require('./pattern');
var g = require('randexp');
var faker = require('faker');
var template = require('template-string');
var Validator = require('validatorjs');
var genData = require('generate-by-validation/generate');
var messages = require('../message/message.js');
var Randexp = require("randexp");
var fs = require('fs-extra');
var validationPath = "validations/"

var gInput = {
  'customValidations':{},
  'registerCustomValidatorJS' : function(){
    try {
      var customValidator = require(process.cwd()+'/validations')
      console.log(customValidator);
      _.forEach(customValidator,function(n,key){
        Validator.register(key,function(value,req,attribute){
          return n(value,req,attribute);
        },messages.messages[key])
      })
    } catch (e) {

    }
    console.log(Validator);
  },
  'injectCustomValidation' : function(){
    var _this = this;
    try {
      var files = fs.readdirSync(validationPath);
      _.forEach(files,function(file,index){
        var name = file.replace(/\.[^/.]+$/, "")
        genData.injectCustomRule(name,process.cwd()+"/"+validationPath+name);
        genData.injectCustomRule("^"+name,process.cwd()+"/"+validationPath+name);
      })
    } catch (e) {
      console.log(e.message);
    }
  },
  "setCustomMessage":function(){
    try{
      var customMessage = require(process.cwd()+'/message');
      _.forEach(customMessage,function(n,key){
        messages.setMessage(key,n);
      })
    }catch(e){
      // return console.log($e.message);
    }
    console.log(messages);
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
  "getArrayOfCombinationRule":function(arrayOfValidation){
    var arrayTemp = []
    var _this = this
    _.forEach(arrayOfValidation,function(n,key){
      var combinations = _this.getCombinations(n);
      arrayTemp.push(_.sortByOrder(combinations, function(n){
        return _.size(n);
      },"desc"));
    })

    return arrayTemp;
  },
  "getArrayOfValidation":function(inputConfig){
    var arrayOfValidation = []

    _.forEach(inputConfig,function(n,key){
      arrayOfValidation.push(n.validation);
    })

    return arrayOfValidation
  },
  'ValidationCombination':function ValidationCombination(arrayOfValidation){
    var temp = []
    var result = []
    function loop(arrayOfValidation, index){
      _.forEach(arrayOfValidation[index],function(data,i){
        temp.push(data)
        if(typeof arrayOfValidation[index+1] != "undefined"){
          loop(arrayOfValidation,index+1)
          temp.pop()
        }else{
          var a = temp.slice();
          result.push(a);
          temp.pop()
        }
      })
    }
    loop(arrayOfValidation,0)
    return result;
  },
  'objectDifference':function(object1,object2){
    var data = [].concat(object1);
    var data2 = [].concat(object2);

    function diff(n,m){
      var popObj = m.pop();
      if(popObj){
        var idx = _.findIndex(n, function(rule) {
          return rule === popObj;
        })
        if(idx>=0){
          n.splice(idx,1)
        }
        diff(n,m)
      }
    }
    diff(data,data2);

    return data;
  },
  'generateCombinationRule':function(combinationRule,arrayOfValidation){
    var _this = this;
    var arrayOfRules = combinationRule.slice();
    _.forEach(combinationRule,function(validations,key){
      _.forEach(validations,function(validation,index){
        var difference = _this.objectDifference(arrayOfValidation[key],validation)
        var negateDifference = _this.negateValidation(difference)
        arrayOfRules[key][index] = combinationRule[key][index].concat(negateDifference)
      })
    })

    return arrayOfRules;
  },
  'negateValidation':function(diff){
    var negate = []

    _.forEach(diff,function(data,key){
      negate.push("^"+data);
    })
    return negate
  },
  'normalizeArrayOfTestCaseValidation':function (arrayOfTestCaseValidation,input){
    var _this = this;
    var normalArray = [];
    _.forEach(arrayOfTestCaseValidation,function(testCaseValidation,key){
      var normalTestCase = {}
      _.forEach(testCaseValidation,function(testCaseField,index){
        normalTestCase[input[index].selector] = testCaseField;
      });
      normalArray.push(normalTestCase);
      normalTestCase = {}
    })

    return normalArray;
  },
  'generateTestCases':function (arrayOfNormalTestCaseValidation){
    // 1. contain ^required generate  null
    // 2. all without ^required => just generate it with the rest of validation
    var _this = this;
    var finalTestCase = [];
    _.forEach(arrayOfNormalTestCaseValidation,function(validations,key){
      var testCase = _this.generateTestCase(validations)
      finalTestCase.push(testCase);
    })
    // fs.writeJson(process.cwd()+"/log/testCase.json", finalTestCase)
    return finalTestCase;
  },
  'generateTestCase':function (normalTestCaseValidation){
      var testCase = {
        "rules":normalTestCaseValidation,
        "testCases":{}
      };
      _.forEach(normalTestCaseValidation,function(validation,index){
        var foundRequiredIndex = _.findIndex(validation, function(rule) { return rule === "^required" });
        if(foundRequiredIndex >= 0){
          testCase.testCases[index] = "";
        }else{
          // var foundCustomRuleIndex = _.findIndex(validation, function(rule) { return _.includes(rule,"unique") });
          // if(foundCustomRuleIndex >= 0){
          //   var size = validation[foundCustomRuleIndex].split(':')
          //   if(size.length > 0 && size.length<=2){
          //
          //   }
          // }else {
            var inputTestCase = genData.generate(validation);
            testCase.testCases[index] = inputTestCase
          // }
        }
      })
    return testCase;
  },
  'generateInputRecord':function (inputConfig){

    var _this = this;
    // set custom message respon
    // this.setCustomMessage()
    this.injectCustomValidation()

    // generate combinationarray that possible make app error

    var gInput = []
    var arrayOfValidation = this.getArrayOfValidation(inputConfig)
    var arrayOfCombinationRule = this.getArrayOfCombinationRule(arrayOfValidation)

    var arrayOfCompleteCombinationRule = [];

    var arrayOfRules = this.generateCombinationRule(arrayOfCombinationRule,arrayOfValidation)

    var arrayOfTestCaseValidation = this.ValidationCombination(arrayOfRules)

    var arrayOfNormalTestCaseValidation = this.normalizeArrayOfTestCaseValidation(arrayOfTestCaseValidation,inputConfig)

    return finalTestCase = this.generateTestCases(arrayOfNormalTestCaseValidation)
  },
  'getFlatRules' : function(configs){
    var flatRules = {}
    _.forEach(configs,function(config,index){
      flatRules[config.selector] = config.validation.join("|")
    })
    return flatRules;
  },
  'generateOutputResults' : function (inputs,configs){

    var _this = this;
    // set custom message respon
    this.setCustomMessage()
    this.registerCustomValidatorJS()

    _.forEach(inputs,function(input,key){
      var rules = _this.getFlatRules(configs)
      var data = input.testCases;

      var validation = new Validator(data,rules);
      if(validation.passes()){
        inputs[key].messages = messages.messages.success;
      }else{
        inputs[key].messages = validation.errors;
      }
    })

    return inputs
  }
}

module.exports = gInput;
