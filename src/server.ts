import { join } from 'node:path';
import express from 'express'
import { AngularNodeAppEngine, createNodeRequestHandler, writeResponseToNodeResponse } from '@angular/ssr/node';
import { antiBot } from './server/middlewares/antibot';
import cors from 'cors'
import { abGroupMiddleware } from './server/middlewares/ab-group';
 
const app = express()
const angularApp = new AngularNodeAppEngine()

const browserDistFolder = join(import.meta.dirname, '/../browser')

app.use(cors())

app.use(
  express.static(browserDistFolder)
)

app.use(antiBot)

app.use(async (req, res, next) => {
  try {
    const angularRes = await angularApp.handle(req, abGroupMiddleware(req, res, next))
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

// app.listen(process.env['PORT'] ?? 3000, () => {
//   console.log('serveur démarré')
// })

export const reqHandler = createNodeRequestHandler(app)