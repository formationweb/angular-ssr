import { join } from 'node:path';
import express from 'express'
import { AngularNodeAppEngine, createNodeRequestHandler, writeResponseToNodeResponse } from '@angular/ssr/node';
 
const app = express()
const angularApp = new AngularNodeAppEngine()

const browserDistFolder = join(import.meta.dirname, '/../browser')

app.use(
  express.static(browserDistFolder)
)

app.use(async (req, res, next) => {
  try {
    const angularRes = await angularApp.handle(req)
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