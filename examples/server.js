const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackConfig = require('./webpack.config')

const app = express()
const compiler = webpack(WebpackConfig)

app.use(webpackDevMiddleware(compiler, {
  publicPath: '/__build__/',
  stats: {
    colors: true,
    chunks: false
  }
}))

app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname, {
  setHeaders (res) {
    res.cookie('XSRF-TOKEN-D', '1234abc')
  }
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


const router = express.Router()

registerSimpleRouter()
registerBodyRouter()
registerErrorRouter()
registerExtendRouter()
registerInterceptorRouter()

app.use(router)

const port = process.env.PORT || 8089
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})

function registerSimpleRouter () {
  router.get('/simple/get', function(req, res) {
    res.json({
      msg: `hello world`
    })
  })
}

function registerBodyRouter () {
  router.post('/body/post', function(req, res) {
    res.json(req.body)
  })
}

function registerErrorRouter() {
  router.get('/error/get', function(req, res) {
    if (Math.random() > 0.5) {
      res.json({
        msg: `hello world`
      })
    } else {
      res.status(500)
      res.end()
    }
  })

  router.get('/error/timeout', function(req, res) {
    setTimeout(() => {
      res.json({
        msg: `hello world`
      })
    }, 3000)
  })
}

function registerExtendRouter () {
  router.get('/extend/get', function(req, res) {
    res.json({
      msg: 'hello world'
    })
  })

  router.options('/extend/options', function(req, res) {
    res.end()
  })

  router.delete('/extend/delete', function(req, res) {
    res.end()
  })

  router.head('/extend/head', function(req, res) {
    res.end()
  })

  router.post('/extend/post', function(req, res) {
    res.json(req.body)
  })

  router.put('/extend/put', function(req, res) {
    res.json(req.body)
  })

  router.patch('/extend/patch', function(req, res) {
    res.json(req.body)
  })

  router.get('/extend/user', function(req, res) {
    res.json({
      code: 0,
      message: 'ok',
      result: {
        name: 'jack',
        age: '18'
      }
    })
  })
}

function registerInterceptorRouter () {
  router.get('/interceptor/get', function(req, res) {
    res.end('hello')
  })
}
