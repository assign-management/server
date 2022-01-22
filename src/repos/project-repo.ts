import pool from '../pool';
import { CreateProjectArgs, Project } from '../generated/graphql';

const parseTableRow = (row: any) => {
  const replaced: any = {};
  for (const key in row) {
    if (Object.hasOwnProperty.call(row, key)) {
      const camelCase = key.replace(/([-_][a-z])/gi, ($1) => $1.toUpperCase().replace('_', ''));
      replaced[camelCase] = row[key];
    }
  }
  return replaced;
};

const parseTableResponse = (rows: any) => {
  if (!Array.isArray(rows)) rows = [rows];
  return rows.map(parseTableRow);
};

class ProjectRepo {
  async find(args: any) {
    const project = await pool.knex.from('projects').select('*');
    return parseTableResponse(project);
  }

  async findById(id: any) {
    const project = await pool.knex.from('projects').where(id).select('*').first().returning('*');
    return parseTableRow(project);
  }

  async create(args: any): Promise<Project> {
    return parseTableResponse(await pool.knex.from('projects').insert(args).returning('*'))[0];
  }

  async count() {
    const { count }: any = await pool.knex.from('projects').count('id').first();

    return Number.parseInt(count);
  }
}

export default new ProjectRepo();
