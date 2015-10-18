define(function (require, exports, module) {
  module.exports = function() {
    function MyFactory() {}

    MyFactory.prototype.getName = function() {
      return 'My Factory';
    };

    return new MyFactory();
  };
});