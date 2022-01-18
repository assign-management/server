import pool from '../database/pool';
import { Accessibility } from '../utils/constants';

class ProjectRepo {
  // find() {
  //   const test = this.queryBuilder.select('id', 'email', 'created_at', 'updated_at');

  //   console.log(test);
  // }

  create(args: any) {
    return pool.knex.from('projects').insert(args);
  }
}

export default new ProjectRepo();
