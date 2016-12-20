var config = {
  /*
    browser that you use
  */
  'browser':['firefox'],

  /*
    Before Execution Script
  */
  'beforeExec':'before.js',

  /*
    Scenario Test
  */
  'scenario':'test.js',

  /*
    Custom Validation
  */
  'customValidation':'validation.js',

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
  'startingUrl':'http://todoapps.dev/register',

  /*
    data location ehich store our generated data
  */
  'data':'data.json'

}

module.exports = config;
