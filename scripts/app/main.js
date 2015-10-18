define(function(require, exports, module) {
  module.name = 'app';

  var deps = [];

  var mod =  angular.module(module.name, deps)
    .directive('clot', require('./directives'))
    .service('MyService', require('./services'))
    .factory('MyFactory', require('./factories'))
    .provider('MyProv', require('./providers'))
    .value('TestValue', 'sancho')
    .controller(module.name + 'Controller', require('./controllers'))
    .config(function (MyProvProvider) {
      MyProvProvider.setSalutation('Hola');
    })
    .run(function () {});
  mod.aliasController = 'ctrl';
  module.exports = mod;
});