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

Support for:
- [x] Strings
- [x] Numbers
- [ ] Images
- [ ] Paragraphs
