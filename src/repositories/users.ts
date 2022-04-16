import { OauthPayload, User } from '../types/user';
import { CreateUserData } from '../types/generated/graphql';
import { Repository } from '../utils/repository';

class UserRepository extends Repository<User, CreateUserData | OauthPayload> {
  constructor() {
    super({
      tableName: 'users',
      returnedColumns: [
        'id',
        'email',
        'password',
        'name',
        'role',
        'image',
        'provider',
        'resetToken',
        'resetTokenExpires',
        'createdAt',
        'updatedAt',
      ],
    });
  }
}

export const userRepository = new UserRepository();
