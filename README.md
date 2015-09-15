# Coba
Coba is simple tool to help us to do functional system testing easier.

##Installation

To install coba using npm you just need type
```javascript
npm install coba
```

##Usage

coba support create test case, generate data 

###Initiate Test

You can initiate functional test with
```javascript
coba init name

//for example

coba init registration_page
```
###Generate data

For now coba just generate normal data and null data for invalid data.

First you need to edit config.js file and 
```javascript
var config = {
  /*
    browser that you use
  */
  'browser':'firefox',
  
  /*
    Scenario Test
  */
  'scenario':'test.js',

  /*
    Input form that available on your test page 
    Ex: 
      [
        {
          'type':'string',
          'selector':'.sel',
        }
      ]
  */
  'input':[
    {
      'type':'name',
      'selector': "[name='name']",
      'name':'name',
      'validation':['required','min:8','max:20']
    },
    {
      'type':'email',
      'selector': "[name='email']",
      'name':'email',
      'validation':['required','min:8','max:20']
    },
    {
      'type':'password',
      'selector': "[name='password']",
      'name':'password',
      'validation':['required','min:8']
    }
  ],
  
  /*
    your page test url
    Ex : http://www.example.com
  */
  'url':'http://todoapps.dev/register',
  
  /*
    data location ehich store our generated data
  */
  'data':'data.json'
  
}

```

After that we can call coba generate syntax
```javascript
  coba generate input
```

after that you will have generated dataon your data.json. It will be like this
```javascript
 {
    "value": {
      "[name='name']": "Cyril Kub",
      "[name='email']": "Summer.Hauck72@yahoo.com",
      "[name='password']": "qm0LbBWjANepvOy"
    },
    "result": "Your account has been created and activation link already send to your email"
  },
  {
    "value": {},
    "result": [
      "The name field is required.",
      "The email field is required.",
      "The password field is required."
    ]
  },
  {
    "value": {
      "[name='name']": "Camila Russel"
    },
    "result": [
      "The email field is required.",
      "The password field is required."
    ]
  }
```

And offcourse we provide result of the process, the result generated base on your validation on the input. for now it's just recognize required property :D

You can modified result message by create message.js on your current test folder
```javascript
var messages = {
  'success': 'Your account has been created and activation link already send to your email',
  'required: "${name} field absolutelly required"
}

module.exports = messages;
```

After you generated input you can run test by 
```javascript
coba test config.js
```

But remember, before you run test you need Selenium standalone server to be run, check http://seleniumhq.com for download link

PS: Please note this, this project is unfinished project. 
