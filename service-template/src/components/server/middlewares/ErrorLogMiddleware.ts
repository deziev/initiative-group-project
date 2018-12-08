import * as morgan from 'morgan';
import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';
import { Logger } from '@interfaces';
import { expressLogger } from '../../log';
import { getStream } from '../../log/getStream';

@Middleware({ type: 'before' })
export class ErrorLogMiddleware implements ExpressMiddlewareInterface {
    private logger: Logger = expressLogger;

    public use = (request: Request, response: Response, next: NextFunction): void => {
        morgan('dev', {
            skip: (_req, res) => res.statusCode < 400,
            stream: getStream(this.logger.warn.bind(this.logger))
        })(request, response, next);
    }
}