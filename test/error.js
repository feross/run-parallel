var parallel = require('../')
var test = require('tape')

test('functions that return errors', function (t) {
  t.plan(3)

  var tasks = [
    function (cb) {
      t.pass('cb 1')
      cb(new Error('oops'))
    },
    function (cb) {
      setTimeout(function () {
        t.pass('cb 2')
        cb(null, 2)
      }, 100)
    }
  ]

  parallel(tasks, function (err) {
    t.ok(err instanceof Error)
  })
})