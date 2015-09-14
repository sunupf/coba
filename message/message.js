var messages = {
  'messages':{
    'success': 'Data has been saved',
    'required': 'The {{name}} field is required.'
  },
  'setMessage':function(key,msg){
    this.messages[key] = msg
  }
}

module.exports = messages;