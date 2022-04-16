import { AuthenticationError, UserInputError } from 'apollo-server-core';
import { userRepository } from '../repositories/users';
import { CreateUserData, LoginData, MutationStatus, Role, UserMutationResponse } from '../types/generated/graphql';
import { createUserValidation, loginValidation, oauthRegistrationValidation } from '../validations/users';
import { Password } from './password';
import jwt, { verify } from 'jsonwebtoken';
import { OauthPayload, User } from '../types/user';
import { SECRET } from '../config/environment';
import _ from 'lodash';
import { emailValidation, UUIDValidation } from '../validations';
import { promisify } from 'util';
import { Logger } from '../utils/logger';

const verifyJWT = promisify(verify) as any;

export const generateJWTToken = ({ id, role }: User) =>
  jwt.sign({ sub: id, aud: role, iat: Date.now() }, SECRET, {
    expiresIn: '20d',
  });

export const fetchUserById = async (id: string): Promise<User> => {
  UUIDValidation.validate(id);
  return userRepository.findOne({ id });
};

// TODO: move to context handler all beside the decode
export const getUserIdFromJWT = async (jwt: string): Promise<User | undefined> => {
  try {
    const decoded = await verifyJWT(jwt, SECRET);
    const user = await fetchUserById(decoded.sub);

    if (decoded.iat <= user.updatedAt.getTime() - 1000) throw new AuthenticationError('invalid credentials');
    return user;
  } catch (error) {
    Logger.debug(error);
    return undefined;
  }
};

export const fetchUserByEmail = async (email: string): Promise<User> => {
  emailValidation.validate(email);
  return userRepository.findOne({ email });
};

export const oauthRegistration = async (payload: OauthPayload): Promise<User> => {
  oauthRegistrationValidation.validate(payload);
  return userRepository.create(payload);
};

export const login = async (data: LoginData): Promise<UserMutationResponse> => {
  loginValidation.validate(data);
  let user = await userRepository.findOne({ email: data.email });
  if (!user) throw new UserInputError('e');

  return { status: MutationStatus.Success, user };
};

export const registration = async (data: CreateUserData): Promise<UserMutationResponse> => {
  createUserValidation.validate(data);
  const isUserExists = await userRepository.findOne({ email: data.email });
  if (isUserExists) throw new UserInputError('the email address already in use');

  const { password, ...rest } = data;
  const hashedPassword = await Password.toHash(password);

  const user = await userRepository.create({ ...rest, password: hashedPassword });

  const token = generateJWTToken(user);

  const payload = { ..._.pick(user, ['id', 'name', 'email']), token };

  return { status: MutationStatus.Success, user: payload };
};
