import * as bodyParser from 'body-parser';
import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';

@Middleware({ type: 'before' })
export class BodyParserMiddleware implements ExpressMiddlewareInterface {
    public use = bodyParser.json();
}