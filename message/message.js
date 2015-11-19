var messages = {
  'messages':{
    'required': 'The :attribute field is required.',
    'unique': 'The :attribute has already been taken.',
    'max': {
  		'numeric': 'The :attribute must be less than :max.',
  		'string': 'The :attribute may not be greater than :max characters.'
  	}
  },
  'setMessage':function(key,msg){
    this.messages[key] = msg
  }
}

module.exports = messages;
