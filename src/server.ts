import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express, { Response as ExpressResponse } from 'express';
import { join } from 'node:path';
import cors from 'cors';
import { antiBot } from './server/middlewares/anti-bot';

const app = express();
const angularApp = new AngularNodeAppEngine();

const browserDistFolder = join(import.meta.dirname, '..', 'browser');

app.use(cors());
app.use(antiBot);

app.use(express.static(browserDistFolder));

app.use(async (req, res: ExpressResponse, next) => {
  try {
    const cookieHeader = req.headers['cookie'] ?? '';
    // test=dadzdz;test2=dzfezf
    const cookies = Object.fromEntries(
      cookieHeader
        .split(';')
        .map((str) => str.split('='))
        .filter((array) => array.length == 2),
    );
    let group: string | undefined = cookies['ab-group']
    if (!group) {
      group = Math.random() < 0.5 ? 'a': 'b'
      res.setHeader('Set-Cookie', `ab-group=${group}; Path=/`)
    }
    const angularRes: Response | null = await angularApp.handle(req, {
      group
    });
    if (angularRes) {
      await writeResponseToNodeResponse(angularRes, res);
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
});

export const reqHandler = createNodeRequestHandler(app);
