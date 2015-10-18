define(function (require, exports, module) {
  exports.MyController = ['$scope', 'MyService', 'TestValue', 'MyFactory', 'MyProv', function ($scope, MyService, TestValue, MyFactory, MyProv) {
    var ctrl = this;
    ctrl.pepe = 'juan';
    ctrl.other = MyService.getPepe();
    ctrl.san = TestValue;
    $scope.mani = 'pindas';
    //$scope.myDefault = 'A different value';
    ctrl.name = MyFactory.getName();
    ctrl.greeting = MyProv.greet();
  }];
});