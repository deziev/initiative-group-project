import { Intel, IntelLogger as Logger } from 'intel-types';
const intel: Intel = require('intel');

interface LoggerConfig {
    formatters: any;
    handlers: any;
    loggers: any;
}

class LoggerFactory {
    private intel: Intel;

    constructor(loggerConfig: LoggerConfig) {
        this.intel = intel;
        this.intel.config(loggerConfig);
    }

    public createLogger(name: string): Logger {
        return this.intel.getLogger(name);
    }
}

export { LoggerFactory, LoggerConfig };