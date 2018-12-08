import 'reflect-metadata';
import 'source-map-support/register';
import * as hardRejection from 'hard-rejection';


// Initital load
import './components/configLoader';
import './components/log';

hardRejection();