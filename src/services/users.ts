import { UserInputError } from 'apollo-server-core';
import { userRepository } from '../repositories/users';
import { CreateUserData, LoginData, MutationStatus, Role, UserMutationResponse } from '../types/generated/graphql';
import { createUserValidation, loginValidation } from '../validations/users';
import { Password } from './password';
import jwt from 'jsonwebtoken';
import { User } from '../types/user';

import { SECRET } from '../config/environment';
import _ from 'lodash';

const generateAuthToken = ({ id, role }: User) =>
  jwt.sign({ sub: id, aud: role, iat: Date.now() }, SECRET, {
    expiresIn: '20d',
  });

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

  const token = generateAuthToken(user);

  const payload = { ..._.pick(user, ['id', 'name', 'email']), token };

  return { status: MutationStatus.Success, user: payload };
};

export const profile = async () => {
  // loginValidation.validate(data);
  // let user = await userRepository.findOne({ email: data.email });
  // if (!user) throw new UserInputError('e');

  return {
    id: '',
    email: '',
    password: '',
    name: '',
    role: Role.Member,
    resetToken: '',
    resetTokenExpires: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};
