import path from 'path'
import chokidar from 'chokidar'
import express from 'express'
import bodyParser from 'body-parser'
import Mock from 'mockjs'
import chalk from 'chalk'
import { mocks } from './index.js'
const app = express()
const port = 8080
const mockDir = path.join(process.cwd(), 'mock')

function registerRoutes(app) {
  let mockLastIndex
  const mocksForServer = mocks.map(route => {
    return responseFake(route.url, route.type, route.response)
  })
  for (const mock of mocksForServer) {
    app[mock.type](mock.url, mock.response)
    mockLastIndex = app._router.stack.length
  }
  const mockRoutesLength = Object.keys(mocksForServer).length
  return {
    mockRoutesLength: mockRoutesLength,
    mockStartIndex: mockLastIndex - mockRoutesLength
  }
}

// for mock server
const responseFake = (url, type, respond) => {
  const version = 'v1'
  return {
    url: new RegExp(`/dev${url.replace('{version}', version)}`),
    type: type || 'get',
    response(req, res) {
      console.log('request invoke:' + req.path)
      console.log(req.query)
      res.json(Mock.mock(respond instanceof Function ? respond(req, res) : respond))
    }
  }
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const mockRoutes = registerRoutes(app)
let mockRoutesLength = mockRoutes.mockRoutesLength
let mockStartIndex = mockRoutes.mockStartIndex

chokidar.watch(mockDir, {
  ignored: /mock-server/,
  ignoreInitial: true
}).on('all', (event, path) => {
  if (event === 'change' || event === 'add') {
    try {
      // remove mock routes stack
      app._router.stack.splice(mockStartIndex, mockRoutesLength)

      // clear routes cache
      // unregisterRoutes()
      const mockRoutes = registerRoutes(app)
      mockRoutesLength = mockRoutes.mockRoutesLength
      mockStartIndex = mockRoutes.mockStartIndex

      chalk.magentaBright(`\n > Mock Server hot reload success! changed  ${path}`)
    } catch (error) {
      chalk.redBright(error)
    }
  }
})

app.listen(port, () => {
  chalk.magentaBright(`Mock server listening on port ${port}!`)
})
