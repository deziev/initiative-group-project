import './bootstrap';
import { resolve } from 'path';
import { configLoader } from './components/configLoader';
import { Application, ServerConfig } from './components/server/Application';

import { middlewares } from './components/server/middlewares';
const CONTROLLERS_PATH = resolve(__dirname, 'controllers/*.js');


const serverConfig = configLoader.getConfig('server') as ServerConfig;

const app = new Application(
    [CONTROLLERS_PATH], 
    middlewares, 
    serverConfig
)
app.run();
