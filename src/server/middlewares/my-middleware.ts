import { NextFunction, Request, Response } from 'express'

export function myMiddleware(req: Request, res: Response, next: NextFunction) {
    const url = req.url
    if (url.includes('admin')) {
        res.status(403).json({
            error: 'Forbidden'
        })
        return
    }
    next()
}