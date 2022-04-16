import { User } from '../types/user';
import { CreateUserData } from '../types/generated/graphql';
import { Repository } from '../utils/repository';

class UserRepository extends Repository<User, CreateUserData> {
  constructor() {
    super({
      tableName: 'users',
      returnedColumns: [
        'id',
        'email',
        'password',
        'name',
        'role',
        'resetToken',
        'resetTokenExpires',
        'createdAt',
        'updatedAt',
      ],
    });
  }
}

export const userRepository = new UserRepository();
