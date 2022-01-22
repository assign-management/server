import _ from 'lodash';
import { DATABASE_CONFIG } from '../../config/database';

export const DATABASE_CLI_CONFIG = _.omit(DATABASE_CONFIG, ['connection.database']);
