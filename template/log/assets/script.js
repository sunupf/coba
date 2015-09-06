var logTest = angular.module('log',[]);

logTest.controller('logController',['$scope',function($scope){
  var log = this;  
  log.browsers = [
    {
      'name':'Firefox',
      'file':'firefox.html'
    },
    {
      'name':'Chrome',
      'file':'chrome.html'
    },
    {
      'name':'Safari',
      'file':'safari.html'
    },
    {
      'name':'Opera',
      'file':'Opera.html'
    },
    {
      'name':'Internet Explorer',
      'file':'ie.html'
    },
    {
      'name':'Phantom JS',
      'file':'phantom.html'
    }
  ]
  
  log.data = testingResults;
}])

 
  