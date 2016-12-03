var x  = [
    ['required','between:8,20'],
    ['required','email','unique:users,email'],
    ['required','min:8']
  ]

var temp = []
var result = []
function loop(y, index){
  _.forEach(y[index],function(data,i){
    temp.push(data)
    if(x[index+1]!=undefined){
      loop(x,index+1)
      temp.pop()
    }else{
      var a = temp.slice();
      result.push(a);
      temp.pop()
      console.log("--------------");
    }
  })
}
var _ = require('lodash')

loop(x,0)
console.log(result)
