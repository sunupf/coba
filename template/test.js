(function(){
  var loop = require('../lib/test');
  var helper = require('../lib/helper');
  var binding = require('../lib/binding');
  var _ = require("lodash");

  
  var config,input;
  try{
    config = require(process.cwd()+'/.config');
    
    //Remove next line if you don't want to use data.json
    input = require(process.cwd()+'/data.json');  
  }catch($e){
    return console.log($e.message);
  }
  
  loop.test(config.url,input,function(obj,callback){
    // fill input field on url config.url page
    helper.fillInputField(obj);
    
    // something you want to do after input field filled by data
    binding.click('[name="btnG"]');
    
    //Assertion should be here
    //....
  })
  
}).call(this);