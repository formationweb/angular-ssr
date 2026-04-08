import { NextFunction, Request, Response } from 'express'

function isStaticRequest(url: string): boolean {
    return url.startsWith('/browser') || url.startsWith('/assets')
}

export function antiBot(req: Request, res: Response, next: NextFunction) {
    if (isStaticRequest(req.path)) {
        next()
        return
    }

    const ua = req.headers['user-agent'] ?? ''

    if (/curl|python|bot|crawler|spider/i.test(ua)) {
        res.status(403).send('Bot not allowed')
        return
    }

    next()
}