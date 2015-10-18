require.config({
  baseUrl: 'scripts',
  paths: {
    app: 'app'
  },
  packages: [ 'app' ]
});
(function(orig) {
  angular.modules = [];
  angular.module = function() {
    if (arguments.length > 1) {
      angular.modules.push(arguments[0]);
    }
    return orig.apply(null, arguments);
  }
})(angular.module);