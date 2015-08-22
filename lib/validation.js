var namePattern = /^[a-z0-9_]+$/i;

var validation = {
  isAlphaNumericUnderscore:function isAlphaNumericUnderscore(str){
    return namePattern.test(str)
  }
}
  
module.exports = validation;

