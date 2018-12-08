import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';

@Middleware({ type: 'before' })
export class CacheControllMiddleware implements ExpressMiddlewareInterface {
    public use = (_request: Request, response: Response, next: NextFunction): void => {
        response.set({
            'Cache-Control': 'private, no-cache'
        });
        next();
    }
}