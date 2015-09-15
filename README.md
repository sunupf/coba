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

after that you will have generated dataon your data.json