angular-ipsum
=============

Override your content with Lorem Ipsum when designing


# Installation

Place ipsum.js into a folder (or subfolder) in your AngularJS project


# Usage

Add the following lines to any modules (in this case, nav) whose output you want to override:

```
nav.config(function($httpProvider) {
  $httpProvider.responseInterceptors.push('ipsumInterceptor');
});
```

Any JSON you pass in will be processed by angular-ipsum.

## Enabling and Disabling angular-ipsum

By default, the library is disabled and your JSON Requests will be passed through.

To enable the angular-ipsum library, set the variable `$rootScope.ipsum.enabled` to `true` in your module's Controller.

For example:

```
var nav = angular.module('nav', ['settings', 'structure', 'ipsum']);

menuController = function($scope, $element, $rootScope, $log) {

    var panes = $scope.panes = [];

    $rootScope.ipsum.enabled = true;

    $scope.log = $log;
```


## Specifying which Ipsum to use

**angular-ipsum** uses Hipster Ipsum() by default.

If you want to use another ipsum, you can override it by setting the variable `$rootScope.ipsum.language` in your module's `.run`. 

For example:
```
nav.run(function($rootScope) {
    $rootScope.ipsum.language = 'hipster';
});
```

Current 

Support for:
- [x] Strings
- [x] Numbers
- [ ] Images
- [ ] Paragraphs
