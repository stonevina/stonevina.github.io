
// a.js
var b = require('./b');
console.log(b.foo);
setTimeout(() => {
  console.log(b.foo);
  console.log(require('./b').foo);
}, 1000);

// b.js
let foo = {age: 1};
setTimeout(() => {
  foo.age = 2
}, 500);
module.exports = {
  foo: foo,
};

// 执行：node a.js
// 执行结果：
// { age: 1 }
// { age: 2 }
// { age: 2 }


//=============================================================================
//
//=============================================================================

// a.js
var b = require('./b');
console.log(b.foo);
setTimeout(() => {
  console.log(b.foo);
  console.log(require('./b').foo);
}, 1000);

// b.js
let foo = 1;
setTimeout(() => {
  foo = 2;
}, 500);
module.exports = {
  foo: foo,
};

// 执行：node a.js
// 执行结果：
// 1
// 1
// 1

//=============================================================================
//
//=============================================================================

// a.js
import { foo } from './b';
console.log(foo);
setTimeout(() => {
  console.log(foo);
  import('./b').then(({ foo }) => {
    console.log(foo);
  });
}, 1000);

// b.js
export let foo = 1;
setTimeout(() => {
  foo = 2;
}, 500);
// 执行：babel-node a.js
// 执行结果：
// 1
// 2
// 2



// a.js
console.log('a starting');
exports.done = false;
const b = require('./b');
console.log('in a, b.done =', b.done);
exports.done = true;
console.log('a done');

// b.js
console.log('b starting');
exports.done = false;
const a = require('./a');
console.log('in b, a.done =', a.done);
exports.done = true;
console.log('b done');

// node a.js
// 执行结果：
// a starting
// b starting
// in b, a.done = false
// b done
// in a, b.done = true
// a done
// 
// 
// 
// 

// a.js
console.log('a starting')
import {foo} from './b';
console.log('in b, foo:', foo);
export const bar = 2;
console.log('a done');

// b.js
console.log('b starting');
import {bar} from './a';
export const foo = 'foo';
console.log('in a, bar:', bar);
setTimeout(() => {
  console.log('in a, setTimeout bar:', bar);
})
console.log('b done');

// babel-node a.js
// 执行结果：
// b starting
// in a, bar: undefined
// b done
// a starting
// in b, foo: foo
// a done
// in a, setTimeout bar: 2
// 
// 