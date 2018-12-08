import { Logger } from '@interfaces';
import { mainLogger } from '../log';
import * as Express from 'express';
import { createExpressServer } from 'routing-controllers';
import * as cluster from 'cluster';

type ServerConfig = {
    host: string;
    port: number;
    workers: number;
};

class Application {
    public static DEFAULT_CONFIG: ServerConfig = { host: 'localhost', port: 3000, workers: 1 };
    // FIXME: add DI
    private logger: Logger = mainLogger;
    private app: Express.Application;
    private config: ServerConfig;

    constructor(
        controllers: Function[] | string[],
        middlewares: Function[] | string[],
        config: ServerConfig = Application.DEFAULT_CONFIG
    ) {
        this.config = config;
        this.app = createExpressServer({
            defaultErrorHandler: false,
            controllers,
            middlewares
        });
    }

    public run(): void {
        if (this.config.workers === 1) {
            this.launch();
        } else {
            this.clusterLaunch();
        }
    }

    protected launch(): void {
        const { host, port } = this.config;
        this.app.listen({ host, port }, () => {
            this.logger.info(`Server started at http://${host}:${port}`);
        });
    }

    protected clusterLaunch(): void {
        if (cluster.isMaster) {
            const workersCount = this.config.workers;
            this.logger.info(`Starting ${workersCount} workers`);
            for (let i = 0; i < workersCount; i++) {
                cluster.fork();
            }
        } else {
            this.launch();
        }
    }
}

export { Application, ServerConfig };
