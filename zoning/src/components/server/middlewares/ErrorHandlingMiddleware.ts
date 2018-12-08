import { Middleware, ExpressErrorMiddlewareInterface } from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';

@Middleware({ type: 'after' })
export class ErrorHandlingMiddleware implements ExpressErrorMiddlewareInterface {
    public error(error: any, _request: Request, response: Response, _next: NextFunction): void {
        const errorData = {
            code: error.name,
            message: error.message
        };
        const httpCode = error.httpCode || 500;
        response.status(httpCode).json(errorData);
    }
}