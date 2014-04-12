# run-parallel [![travis](https://img.shields.io/travis/feross/run-parallel.svg)](https://travis-ci.org/feross/run-parallel) [![npm](https://img.shields.io/npm/v/run-parallel.svg)](https://npmjs.org/package/run-parallel) [![gittip](https://img.shields.io/gittip/feross.svg)](https://www.gittip.com/feross/)

### Run an array of functions in parallel

![parallel](https://raw.githubusercontent.com/feross/run-parallel/master/img.png) [![browser support](https://ci.testling.com/feross/run-parallel.png)](https://ci.testling.com/feross/run-parallel)

### install

```
npm install run-parallel
```

### usage

#### parallel(tasks, [callback])

Run the `tasks` array of functions in parallel, without waiting until the previous
function has completed. If any of the functions pass an error to its callback, the main
`callback` is immediately called with the value of the error. Once the `tasks` have
completed, the results are passed to the final `callback` as an array.

```js
var parallel = require('run-parallel')

parallel([
  function (callback) {
    setTimeout(function () {
      callback(null, 'one')
    }, 200)
  },
  function (callback) {
    setTimeout(function () {
      callback(null, 'two')
    }, 100)
  }
],
// optional callback
function (err, results) {
  // the results array will equal ['one','two'] even though
  // the second function had a shorter timeout.
})
```

This module is basically equavalent to
[`async.parallel`](https://github.com/caolan/async#paralleltasks-callback), but it's
handy to just have the one function you need instead of the kitchen sink. Modularity!
Especially handy if you're serving to the browser and need to reduce your javascript
bundle size.

Works great in the browser with [browserify](http://browserify.org/)!

## license

MIT. Copyright (c) [Feross Aboukhadijeh](http://feross.org).
