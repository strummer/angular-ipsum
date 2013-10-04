/* Ipsum - Override all Factory outputs with lorem ipsum while building */

var ipsum = angular.module('ipsum', []);

ipsumController = function($rootScope, ipsumContent) {
  // Runs once when the module is first loaded
  $rootScope.ipsum.initialized = true;

  // Load ipsum config
  if(!$rootScope.ipsum.language) {
    // Load the proper ipsum module
    $rootScope.ipsum.language = 'hipster';
  }

  // Initialize ipsum strings
  ipsumContent["string"] = "asjdklfajflkasjlf;jak;fjas";
  ipsumContent["number"] = 18723489712987498.35;
  ipsumContent["default"] = "???";
};

ipsum.factory('ipsumInterceptor', function($q, $rootScope, $log) {
  // Ipsum factory is called after each httprequest
  if(!$rootScope.ipsum) {
    $rootScope.ipsum = {};
  }

  if(!$rootScope.ipsum.initialized) {
    var ipsumContent = {};
    ipsumController($rootScope, ipsumContent);
  }

  return function(promise) {
    return promise.then(function(response) {
      // We should only affect JSON objects
      if(response.headers()['content-type'] === "application/json") {

        // Process JSON here
        data = response.data;
        ipsumData = {};

        angular.forEach(data, function(value, key) {
          switch(typeof(value)) {
            case "string":
              ipsumData[key] = ipsumContent["string"];
              break;
            case "number":
              ipsumData[key] = ipsumContent["number"];
              break;
            default:
              ipsumData[key] = ipsumContent["default"];
              break;
          }
        });
        response.data = ipsumData;
      }
      return response;
    });
  };
});