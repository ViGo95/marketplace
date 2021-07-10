function error(log, code) {
  let err = new Error(log)

  err.statusCode = code
  
  console.log(`[SERVER_ERROR] -> ${err}`)
  
  return err
}

module.exports = error