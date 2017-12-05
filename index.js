'use strict';

var usePolyfill = !process.version ||
    process.version.indexOf('v0.') === 0 ||
    process.version.indexOf('v1.') === 0 && process.version.indexOf('v1.8.') !== 0;

module.exports = nextTick;

function nextTick(fn, arg1, arg2, arg3) {
  if (typeof fn !== 'function') {
    throw new TypeError('"callback" argument must be a function');
  }
  var len = arguments.length;
  var args, i;
  switch (len) {
  case 0:
  case 1:
    return process.nextTick(fn);
  case 2:
    return usePolyfill ?
      process.nextTick(function afterTickOne() {
        fn.call(null, arg1);
      }) :
      process.nextTick(fn, arg1);
  case 3:
    return usePolyfill ?
      process.nextTick(function afterTickTwo() {
        fn.call(null, arg1, arg2);
      }) :
      process.nextTick(fn, arg1, arg2);
  case 4:
    return usePolyfill ?
      process.nextTick(function afterTickThree() {
        fn.call(null, arg1, arg2, arg3);
      }) :
      process.nextTick(fn, arg1, arg2, arg3);
  default:
    if (!usePolyfill) {
      return process.nextTick.apply(null, arguments);
    }
    args = new Array(len - 1);
    i = 0;
    while (i < args.length) {
      args[i++] = arguments[i];
    }
    return process.nextTick(function afterTick() {
      fn.apply(null, args);
    });
  }
}
