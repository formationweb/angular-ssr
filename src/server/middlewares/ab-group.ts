import { NextFunction, Request, Response } from "express"

export function abGroupMiddleware(req: Request, res: Response, next: NextFunction) {
    const cookieHeader = req.headers['cookie'] ?? ''
    // test=assa;test2=sada
    const cookies = Object.fromEntries(
            cookieHeader.split(';')
            .map(str => str.split('='))
            .filter(array => array.length == 2)
    )
    
    let group: string | undefined = cookies['ab-group']

    if (!group) {
        group = Math.random() < 0.5 ? 'a' : 'b'
        res.setHeader('Set-Cookie', `ab-group=${group}`)
    }

    return {
        group
    }
}