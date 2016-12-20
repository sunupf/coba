var customTest = function(testSuite){
  var data = testSuite.data;
  var coba = testSuite.coba;
  var driver = coba.driver;

  coba.fillInputForm(data.testCases, driver);

}

module.exports = customTest
