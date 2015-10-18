define(function (require, exports, module) {
   module.exports = function() {
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
   };
});