define(function(require, exports, module) {
  module.name = 'app';

  var deps = [];

  var mod =  angular.module(module.name, deps)
    .directive('clot', function() {
      return {
        scope: {},
        restrict: 'E',
        replace: true,
        template: '<div>Clot</div>'
      };
    })
    .service('MyService', function() {
      return {
        getPepe: function() {
          return 'Juanete';
        }
      }
    })
    .factory('MyFactory', function() {
      function MyFactory() {}

      MyFactory.prototype.getName = function() {
        return 'My Factory';
      };

      return new MyFactory();
    })
    .provider('MyProv', function() {
      var salutation = 'Hello';
      this.setSalutation = function(s) {
        salutation = s;
      };

      function Greeter() {
        this.greet = function() {
          return salutation;
        }
      }

      this.$get = function() {
        return new Greeter();
      };
    })
    .value('TestValue', 'sancho')
    .controller(module.name + 'Controller', ['$scope', 'MyService', 'TestValue', 'MyFactory', 'MyProv', function($scope, MyService, TestValue, MyFactory, MyProv) {
      var ctrl = this;
      ctrl.pepe = 'juan';
      ctrl.other = MyService.getPepe();
      ctrl.san = TestValue;
      $scope.mani = 'pindas';
      //$scope.myDefault = 'A different value';
      ctrl.name = MyFactory.getName();
      ctrl.greeting = MyProv.greet();
    }])
    .config(function (MyProvProvider) {
      MyProvProvider.setSalutation('Hola');
    })
    .run(function () {

    });
  mod.aliasController = 'ctrl';
  module.exports = mod;
});