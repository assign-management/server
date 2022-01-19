import pool from '../database/pool';

const parseTableResponse = (rows: any[]) => {
  return rows.map((row: any) => {
    const replaced: any = {};
    for (const key in row) {
      if (Object.hasOwnProperty.call(row, key)) {
        const camelCase = key.replace(/([-_][a-z])/gi, ($1) => $1.toUpperCase().replace('_', ''));
        replaced[camelCase] = row[key];
      }
    }
    return replaced;
  });
};

class ProjectRepo {
  async find() {
    return parseTableResponse(await pool.knex.from('projects').select('*'));
  }

  async create(args: any) {
    return parseTableResponse(await pool.knex.from('projects').insert(args).returning('*'))[0];
  }
}

export default new ProjectRepo();
