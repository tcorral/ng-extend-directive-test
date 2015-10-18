define(function(require, exports, module) {

  var main = require('./main');

  var extendControllers = {};
  extendControllers[main.name + 'Controller'] = {
    $$scope: {
      mani: 'testear'
    },
    pepe: 'juana',
    $scope: {
      myDefault: 'My default value'
    }
  };

  module.exports = main
    .config(function($provide) {
      $provide.decorator('$controller', ['$delegate', function($delegate) {
        return function(constructor, locals) {
          var constructorName = constructor.split(' ')[0];
          var extendController = extendControllers[constructorName];
          var controller = $delegate(constructor, locals);

          if (extendController) {
            // Force the specified values in $scope of the decorated controller.
            if (extendController.hasOwnProperty('$$scope')) {
              for (var key in extendController.$$scope) {
                Object.defineProperty(locals.$scope, key, (function(value) {
                  return {
                    get: function() {
                      return value;
                    },
                    set: function() {}
                  };

                }(extendController.$$scope[key])));
              }
            }
            delete extendController.$$scope;
            // Extend $scope that could be overwritten.
            locals.$scope = angular.extend(locals.$scope, extendController.$scope || {});
            controller = $delegate(constructor, locals);
            // Extend controller.
            controller = angular.extend(controller, extendController);
          }

          return controller;
        }
      }])
    });
});