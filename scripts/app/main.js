define(function(require, exports, module) {
  module.name = 'app';

  var deps = [];

  var mod =  angular.module(module.name, deps)
    .controller(module.name + 'Controller', ['$scope', function ($scope) {
      var ctrl = this;
      ctrl.other = 'pepe';
      $scope.mani = 'santos';
    }])
    .run(function () {

    });
  mod.aliasController = 'ctrl';
  module.exports = mod;
});