import { NextFunction, Request, Response } from "express"

export function antiBot(req: Request, res: Response, next: NextFunction)  {
    const ua = req.headers['user-agent'] ?? ''

    if (/curl|python|bot|crawler|spider/i.test(ua)) {
        res.status(403).send('Bot not allowed')
        return
    }

    next()
}