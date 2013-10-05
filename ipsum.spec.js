/* Tests for ipsum.js */

//beforeEach(module('ipsum'));
beforeEach(module('testModule'));

// Fake module to enable Interceptor config
var testModule = angular.module('testModule', ['ipsum']).
  config(function($httpProvider) {
    $httpProvider.responseInterceptors.push('ipsumInterceptor');
  });

describe("factory: ipsumInterceptor", function() {
    var scope;

    // Setup http mocks for remote http calls
    beforeEach(inject(function($injector) {

        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when("GET", "static/nav/settings/settings.json")
            .respond(
              {
                domain: "www.strummer.io",
                id: 1,
                object: {}
              }, {"content-type": "application/json"});
        $httpBackend.when("GET", "static/nav/settings/settings")
            .respond("settings go here");
    }));

    // Initialization

    it("Should be defined", inject(function($rootScope, ipsumInterceptor) {
      expect(ipsumInterceptor).toBeDefined();
    }));

    it("Should be initialized", inject(function($rootScope, ipsumInterceptor) {
      expect($rootScope.ipsum).toBeDefined();
      expect($rootScope.ipsum.initialized).toBeDefined();
      expect($rootScope.ipsum.initialized).toBeTruthy();
    }));

    // Config

    it("Should use hipster 'language' by default", inject(function($rootScope, ipsumInterceptor) {
      var expectedLanguage = 'hipster';

      expect($rootScope.ipsum.language).toEqual(expectedLanguage);
    }));

    it("Should allow a user to override the language", inject(function($rootScope, ipsumInterceptor) {
      var expectedLanguage = 'bill-and-ted';

      // Not sure how to test this yet
      /* testModule.run(function($rootScope) {
        console.log("got here");
        $rootScope.ipsum = {
        language: "hipster1"
        };
      });

      expect($rootScope.ipsum.language).toEqual(expectedLanguage); */
    }));

    it("Should be disabled by default", inject(function($http, $rootScope, ipsumInterceptor) {
      expectedDomain = "www.strummer.io";

      expect($rootScope.ipsum.enabled).toBeUndefined();

      $http.get('static/nav/settings/settings.json').success(function(data) {
        expect(data.domain).toEqual(expectedDomain);
      });
      $httpBackend.flush(); // Needed to cause above $http.get to trigger
    }));

    it("Should allow the user to enable ipsum", inject(function($http, $rootScope, ipsumInterceptor) {
      var expectedDomain = "asjdklfajflkasjlf;jak;fjas";

      expect($rootScope.ipsum.enabled).toBeUndefined();

      $rootScope.ipsum.enabled = true;

      $http.get('static/nav/settings/settings.json').success(function(data) {
        expect(data.domain).toEqual(expectedDomain);
      });
      $httpBackend.flush(); // Needed to cause above $http.get to trigger
    }));

    // Functionality

    it("Should not affect non-JSON data", inject(function($http, $rootScope, ipsumInterceptor) {
      var expectedSettings = "settings go here";
      $rootScope.ipsum.enabled = true;

      $http.get('static/nav/settings/settings').success(function(data) {
        expect(data).toEqual(expectedSettings);
      });
      $httpBackend.flush(); // Needed to cause above $http.get to trigger
    }));

    it("Should affect JSON data", inject(function($http, $rootScope, ipsumInterceptor) {
      var expectedDomain = "asjdklfajflkasjlf;jak;fjas"; 
      
      $rootScope.ipsum.enabled = true;

      $http.get('static/nav/settings/settings.json').success(function(data, response, test) {
        expect(data.domain).toEqual(expectedDomain);
      });
      $httpBackend.flush(); // Needed to cause above $http.get to trigger
    }));

    it("Should process strings", inject(function($http, $rootScope, ipsumInterceptor) {
      var expectedDomain = "asjdklfajflkasjlf;jak;fjas";  // Default string override until I get real lorem ipsum content

      $rootScope.ipsum.enabled = true;

      $http.get('static/nav/settings/settings.json').success(function(data, response, test) {
        expect(data.domain).toEqual(expectedDomain);
      });
      $httpBackend.flush(); // Needed to cause above $http.get to trigger
    }));

    it("Should process numbers", inject(function($http, $rootScope, ipsumInterceptor) {
      var expectedId = 18723489712987498.35;  // Default string override until I get real lorem ipsum content

      $rootScope.ipsum.enabled = true;

      $http.get('static/nav/settings/settings.json').success(function(data, response, test) {
        expect(data.id).toEqual(expectedId);
      });
      $httpBackend.flush(); // Needed to cause above $http.get to trigger
    }));

    it("Should affect unknown data", inject(function($http, $rootScope, ipsumInterceptor) {
      var expectedObject = "???";  // Default string override until I get real lorem ipsum content

      $rootScope.ipsum.enabled = true;

      $http.get('static/nav/settings/settings.json').success(function(data, response, test) {
        expect(data.object).toEqual(expectedObject);
      });
      $httpBackend.flush(); // Needed to cause above $http.get to trigger
    }));

});
