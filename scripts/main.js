require.config({
  baseUrl: 'scripts'
});
angular.module('preApp', [])
  .directive('gOnLoad', function () {
    return {
      restrict: 'A',
      scope: {},
      link: function (scope, element, attrs) {
        var content = angular.element(document.body).html();
        require([attrs.gOnLoad], function (module) {
          angular.element(document.body).html('<div ng-controller="' +  module.name + 'Controller as ' + module.aliasController + '">' + content + '</div>');
          angular.bootstrap(angular.element(document.body).find('div')[0], [module.name]);
          document.body.removeAttribute('ng-cloak');
        });
      }
    }
  });
angular.element(document).ready(function () {
  angular.bootstrap(document.getElementsByTagName('head')[0], ['preApp']);
});