angular.module('myApp', [])
  .directive('clot', function () {
    return {
      scope: {},
      restrict: 'E',
      replace: true,
      template: '<div>Clot</div>'
    };
  })
  .controller('MyController', function ($scope, MyService, TestValue){
    var ctrl = this;
    ctrl.pepe = 'juan';
    ctrl.other = MyService.getPepe();
    ctrl.san = TestValue;
    $scope.mani = 'pindas';
    //$scope.myDefault = 'A different value';
  })
  .controller('MySubController', function (){
    var ctrl = this;
    ctrl.pepe = 'pepa';
  })
  .service('MyService', function () {
    return {
      getPepe: function () {
        return 'Juanete';
      }
    }
  })
  .value('TestValue', 'sancho');


var extendControllers = {
  'MyController': {
    $$scope: {
      mani: 'testear'
    },
    pepe: 'juana',
    $scope: {
      myDefault: 'My default value'
    }

  },
  'MySubController': {
    pepe: 'Manuela'
  }
};

// Decorate value
angular.module('myApp')
  .config(function ($provide) {
    $provide.decorator('TestValue', function ($delegate) {
      return 'quijote';
    });
  });

// Decorate service
angular.module('myApp')
  .config(function ($provide) {
    $provide.decorator('MyService', function ($delegate) {
      $delegate.getPepe = function () {
        return 'Other Pepe';
      };
      return $delegate;
    });
  });


// Decorate controller.
angular.module('myApp')
  .config(function ($provide) {
    $provide.decorator('$controller', ['$delegate',  function($delegate) {
      return function(constructor, locals) {
        var constructorName = constructor.split(' ')[0];
        var extendController = extendControllers[constructorName];
        var controller = $delegate(constructor, locals);

        if(extendController) {
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

// Decorate directive.
angular.module('myApp')
.config(function ($provide) {
    $provide.decorator('clotDirective', function ($delegate) {
      var directive = $delegate[0];
      directive.template = '<div>Pepe</div>';
      var link = directive.link;
      directive.restrict = 'AE';
      directive.replace = false;
      directive.compile = function () {
        return function (scope, element, attrs, ctrls) {
          if(typeof link === 'function'){
            return link.apply(this, arguments);
          }
        };
      };
      return $delegate;
    });
  });