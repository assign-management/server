import _ from 'lodash';
import passport, { Profile } from 'passport';
import {
  GoogleCallbackParameters,
  Strategy as GoogleStrategy,
  StrategyOptions as GoogleStrategyOptions,
  VerifyCallback,
  Profile as GoogleProfile,
} from 'passport-google-oauth20';
import { Strategy as GitHubStrategy, StrategyOptions as GithubStrategyOptions } from 'passport-github2';
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '../config/environment';
import { fetchUserByEmail, generateJWTToken, getUserIdFromJWT, oauthRegistration } from './users';
import { OauthPayload, User } from '../types/user';
import ServerError from '../errors/server-error';
import { Logger } from '../utils/logger';

// TODO: add error handling
// TODO: extract types to github type declaration
interface GithubCallbackParameters {
  access_token: string;
  scope: string;
  token_type: string;
}

interface GitHubProfileEmail {
  value: string;
}
interface GithubProfile {
  id: string;
  nodeId: string;
  displayName: string;
  username: string;
  profileUrl: string;
  photos: Profile['photos'];
  provider: 'github';
  emails: GitHubProfileEmail[];
  _json: any;
  _raw: any;
}

type GithubVerificationHandler = (
  accessToken: string,
  refreshToken: string,
  params: GithubCallbackParameters,
  profile: GithubProfile,
  verified: VerifyCallback,
) => void;

type GoogleVerificationHandler = (
  accessToken: string,
  refreshToken: string,
  params: GoogleCallbackParameters,
  profile: GoogleProfile,
  done: VerifyCallback,
) => void;

const GOOGLE_CALLBACK_URL = '/auth/google/callback';
const GITHUB_CALLBACK_URL = '/auth/github/callback';

const googleStrategyOptions: GoogleStrategyOptions = {
  clientID: GOOGLE_CLIENT_ID!,
  clientSecret: GOOGLE_CLIENT_SECRET!,
  callbackURL: GOOGLE_CALLBACK_URL,
  proxy: true,
};
const githubStrategyOptions: GithubStrategyOptions = {
  clientID: GITHUB_CLIENT_ID!,
  clientSecret: GITHUB_CLIENT_SECRET!,
  callbackURL: GITHUB_CALLBACK_URL,
  proxy: true,
  scope: ['user:email'],
};

const getUserImage = ([imagePayload]: Profile['photos'] = []): string | undefined => imagePayload?.value;
const getUserGoogleName = ({ name, displayName }: Profile): string | undefined => {
  if (displayName) return displayName;
  if (name) {
    const { givenName, familyName } = name;
    if (givenName && familyName) return `${_.capitalize(name.givenName)} ${_.capitalize}`;
  }
};

const handleOauth = async (payload: OauthPayload, done: VerifyCallback) => {
  try {
    const existingUser = await fetchUserByEmail(payload.email);
    if (existingUser) return done(null, existingUser);

    const user = await oauthRegistration(payload);
    if (!user) return done(new ServerError('Internal server error', 500));
    return done(null, user);
  } catch (err) {
    Logger.error('handleOauth failure', err);
    done(new ServerError('Internal server error', 500));
  }
};

const googleVerificationHandler: GoogleVerificationHandler = async (
  _accessToken,
  _refreshToken,
  _params,
  profile,
  done,
) => {
  const { provider, photos = [], emails = [] } = profile;
  const email = emails.find((email) => email?.verified);
  const image = getUserImage(photos);
  const name = getUserGoogleName(profile);

  const payload = { image, email: email?.value ?? '', provider, name };
  await handleOauth(payload, done);
};

const githubVerificationHandler: GithubVerificationHandler = async (
  _accessToken,
  _refreshToken,
  _params,
  profile,
  done,
) => {
  const { provider, photos = [], emails = [], displayName: name } = profile;
  const image = getUserImage(photos);
  const email = emails.find((email) => email?.value);

  const payload = { provider, image, name, email: email?.value ?? '' };
  await handleOauth(payload, done);
};

const googleStrategy = new GoogleStrategy(googleStrategyOptions, googleVerificationHandler);
const githubStrategy = new GitHubStrategy(githubStrategyOptions, githubVerificationHandler as any);

passport.use(googleStrategy);
passport.use(githubStrategy);

passport.serializeUser((user, done) => {
  const token = generateJWTToken(user as User);
  done(null, token);
});

passport.deserializeUser(async (jwt, done) => {
  const user = await getUserIdFromJWT(jwt as string);
  done(null, user);
});

export default passport;
