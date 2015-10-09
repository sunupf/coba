var messages = {
  'messages':{
    'required': 'The :attribute field is required.',
    'unique': 'The :email already taken'
  },
  'setMessage':function(key,msg){
    this.messages[key] = msg
  }
}

module.exports = messages;
