declare module 'intel-types' {
    interface ILoggable {
        toString(): string;
    }
    export interface IntelLogger {
        verbose(message: ILoggable): any;
        debug(message: ILoggable): any;
        info(message: ILoggable): any;
        warn(message: ILoggable): any;
        error(message: ILoggable): any;
        critical(message: ILoggable): any;
        setLevel(level: any): IntelLogger;
    }

    export interface Intel extends IntelLogger {
        getLogger(loggerName: string): IntelLogger;
        config(intelConfig: any): void;
    }
}

declare module 'hard-rejection' {
    function install(log?: (message: any) => void): any;
    namespace install {}
    export = install;
}