module.exports = function (tasks, cb) {
  var results, pending, keys, zalgo = true
  if (Array.isArray(tasks)) {
    results = []
    pending = tasks.length
  } else {
    keys = Object.keys(tasks)
    results = {}
    pending = keys.length
  }
  
  function done () {
    if (cb && zalgo) process.nextTick(function () { cb.apply(undefined, arguments) })
    else if (cb) cb.apply(undefined, arguments)
    cb = null
  }

  function each (i, err, result) {
    results[i] = result
    if (--pending === 0 || err) {
      done(err, results)
    }
  }

  if (!pending) {
    // empty
    done(null, results)
  } else if (keys) {
    // object
    keys.forEach(function (key) {
      tasks[key](each.bind(undefined, key))
    })
  } else {
    // array
    tasks.forEach(function (task, i) {
      task(each.bind(undefined, i))
    })
  }
  
  zalgo = false
}
