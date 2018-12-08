import { LoggerFactory, LoggerConfig  } from './LoggerFactory';
import { configLoader } from '../configLoader';

const config = configLoader.getConfig('log') as LoggerConfig;

const loggerFactory = new LoggerFactory(config);

const mainLogger = loggerFactory.createLogger('main');
const expressLogger = loggerFactory.createLogger('express');
const ormLogger = loggerFactory.createLogger('orm');

export { mainLogger, expressLogger, ormLogger };