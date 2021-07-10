exports.success = (req, res, status, info, message, log) => {

  res.header({
    Error: false,
    Message: message
  })

  res.status(status || 200).send(info)

  console.log(`[SERVER] -> ${log}`)
}

exports.error = (req, res, status, info, message, log) => {

  res.header({
    Error: true,
    Message: message
  })

  res.status(status || 500).send(info)

  console.log(`[SERVER_ERROR] -> ${log}`)
}