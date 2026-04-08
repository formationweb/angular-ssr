import { AngularNodeAppEngine, createNodeRequestHandler, writeResponseToNodeResponse } from '@angular/ssr/node'
import express, { Response as ExpressResponse } from 'express'
import { join } from 'node:path'
import cors from 'cors'
import { myMiddleware } from './server/middlewares/my-middleware'

const app = express()
const angularApp = new AngularNodeAppEngine()

const browserDistFolder = join(import.meta.dirname, '..', 'browser')

app.use(cors())
app.use(myMiddleware)

app.use(express.static(browserDistFolder))

app.use(async (req, res: ExpressResponse, next) => {
  try {
    const angularRes: Response | null = await angularApp.handle(req, {
      isAdmin: true
    })
    if (angularRes) {
      await writeResponseToNodeResponse(angularRes, res)
    }
    else {
      next()
    }
  }
  catch (err) {
    next(err)
  }
})

export const reqHandler = createNodeRequestHandler(app)