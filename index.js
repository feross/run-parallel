module.exports = function (tasks, cb) {
  var pending = tasks.length
  var results = []

  function done (i, err, result) {
    if (err) {
      cb && cb(err, results)
      cb = null
      return
    }

    results[i] = result
    pending -= 1

    if (pending === 0) {
      cb && cb(null, results)
      cb = null
    }
  }

  if (tasks.length) {
    tasks.forEach(function (task, i) {
      task(done.bind(undefined, i))
    })
  } else {
    cb && cb(null, [])
    cb = null
  }
}
