const express = require('express')
const proxy = require('http-proxy-middleware')
const path = require('path')
const fallback = require('express-history-api-fallback')
const app = express()
const proxyOptions = require('./proxy.js')
const Intercom = require('intercom-client')

for (let route of Object.keys(proxyOptions)) {
  app.use(route, proxy(proxyOptions[route]))
}

// Return intercom hash for identifying users securely
app.get('/intercom/hash', (req, res) => {
  var hash = Intercom.IdentityVerification.userHash({ secretKey: process.env.INTERCOM_SECRET_KEY, identifier: req.query.id })
  res.send(hash)
})

app.get('/', (req, res) => { res.redirect('/dashboard') })

app.use(express.static(path.join(__dirname, './dist')))
app.use(require('connect-history-api-fallback')())
app.use(fallback('index.html', { root: path.join(__dirname, './dist') }))
const port = process.env.PORT || 3030
app.listen(port)

console.log(`Listening on port ${port}`)
