import { commonSchemas } from './common';
import { projectSchemas } from './projects';
import { sectionSchemas } from './sections';
import { taskSchemas } from './tasks';
import { userSchemas } from './users';

const typeDefs = [commonSchemas, userSchemas, projectSchemas, sectionSchemas, taskSchemas];

export default typeDefs;
