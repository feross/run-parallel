module.exports = function (tasks, cb) {
  var pending = tasks.length
  var results = [] // TODO: preserve order

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

  tasks.forEach(function (task, i) {
    task(done.bind(undefined, i))
  })
}
