import { userRepository } from '../repositories/users';

const registration = async (email: string, password: string, name: string) => {
  let user = await userRepository.findOne({ email });
  if (!user) throw Error('the email address already in use'); // set status to 400

  user = await userRepository.create({ email, password, name });
  return { code: 201, success: true, message: 'User email was successfully updated', user };
};
