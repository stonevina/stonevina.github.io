var name = 100;
var obj = {
  name: 200,
  inner: {
    name: 300,
    print: function() {
      console.log(this.name);
    },
    test: function() {
      (obj.inner.print = obj.inner.print)(); //100
    },
    test1: function() {
      (obj.inner.print)(); //300
    }
  }
};

obj.inner.print(); //300

var f = obj.inner.print;
f(); //100

(obj.inner.print)(); //300

(obj.inner.print = obj.inner.print)(); //100

(function() {
  console.log(name);
  var name = 100;
})();

(function(name) {
  console.log(name);
  var name = 100;
})(200);

(function(name) {
  console.log(name);
  var name = 100;
  function name() {}
})(200);

(function(name) {
  console.log(name);
  function name() {}
  var name = 100;
})(200);