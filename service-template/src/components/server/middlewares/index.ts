import { AccessLogMiddlware } from './AccessLogMiddlware';
import { ErrorLogMiddleware } from './ErrorLogMiddleware';
import { BodyParserMiddleware } from './BodyParserMiddleware';
import { CorsMiddleware } from './CorsMiddleware';
import { CacheControllMiddleware } from './CacheControllMiddleware';
import { ErrorHandlingMiddleware } from './ErrorHandlingMiddleware';

export const middlewares = [
    AccessLogMiddlware,
    ErrorLogMiddleware,
    BodyParserMiddleware,
    CorsMiddleware,
    CacheControllMiddleware,
    ErrorHandlingMiddleware
];