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
      $provide.decorator('TestValue', function() {
        return 'quijote';
      });
      $provide.decorator('MyService', function($delegate) {
        $delegate.getPepe = function() {
          return 'Other Pepe';
        };
        return $delegate;
      });
      $provide.decorator('MyFactory', function($delegate) {
        $delegate.getName = function() {
          return 'My decorated getName'
        };
        return $delegate;
      });
      $provide.decorator('MyProv', function($delegate) {
        $delegate.greet = function() {
          return 'I love you';
        };
        return $delegate;
      });
      $provide.decorator('clotDirective', function($delegate) {
        var directive = $delegate[0];
        directive.template = '<div>Pepe</div>';
        var link = directive.link;
        directive.restrict = 'AE';
        directive.replace = false;
        directive.compile = function() {
          return function(scope, element, attrs, ctrls) {
            if (typeof link === 'function') {
              return link.apply(this, arguments);
            }
          };
        };
        return $delegate;
      });
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