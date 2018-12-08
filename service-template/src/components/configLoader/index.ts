import { resolve } from 'path';
import { AppConfigLoader } from './AppConfigLoader';

export const configLoader = new AppConfigLoader(resolve(__dirname, '../../../config'));