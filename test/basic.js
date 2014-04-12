var parallel = require('../')
var test = require('tape')

test('functions run in parallel', function (t) {
  t.plan(5)

  var tasks = [
    function (cb) {
      setTimeout(function () {
        t.pass('cb 1')
        cb(null)
      }, 100)
    },
    function (cb) {
      setTimeout(function () {
        t.pass('cb 2')
        cb(null)
      }, 100)
    },
    function (cb) {
      setTimeout(function () {
        t.pass('cb 3')
        cb(null)
      }, 100)
    }
  ]

  var startTime = Date.now()
  parallel(tasks, function (err) {
    t.error(err)
    t.ok(Date.now() - startTime < 300)
  })
})

test('functions that return results', function (t) {
  t.plan(4)

  var tasks = [
    function (cb) {
      t.pass('cb 1')
      cb(null, 1)
    },
    function (cb) {
      t.pass('cb 2')
      cb(null, 2)
    }
  ]

  parallel(tasks, function (err, results) {
    t.error(err)
    t.deepEqual(results, [1, 2])
  })
})

test('functions that return results preserve order', function (t) {
  t.plan(4)

  var tasks = [
    function (cb) {
      setTimeout(function () {
        t.pass('cb 1')
        cb(null, 1)
      }, 200)
    },
    function (cb) {
      setTimeout(function () {
        t.pass('cb 2')
        cb(null, 2)
      }, 100)
    }
  ]

  parallel(tasks, function (err, results) {
    t.error(err)

    // 2 should be second, even though it gets returned first
    t.deepEqual(results, [1, 2])
  })
})
