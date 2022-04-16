import passport, { Profile } from 'passport';
import {
  Strategy as GoogleStrategy,
  StrategyOptions as GoogleStrategyOptions,
  VerifyCallback,
} from 'passport-google-oauth20';
import { Strategy as GitHubStrategy, StrategyOptions as GithubStrategyOptions } from 'passport-github2';
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '../config/environment';

type VerificationHandler = (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => void;

const GOOGLE_CALLBACK_URL = '/auth/google/callback';
const GITHUB_CALLBACK_URL = '/auth/github/callback';

const googleStrategyOptions: GoogleStrategyOptions = {
  clientID: GOOGLE_CLIENT_ID!,
  clientSecret: GOOGLE_CLIENT_SECRET!,
  callbackURL: GOOGLE_CALLBACK_URL,
};

const githubStrategyOptions: GithubStrategyOptions = {
  clientID: GITHUB_CLIENT_ID!,
  clientSecret: GITHUB_CLIENT_SECRET!,
  callbackURL: GITHUB_CALLBACK_URL,
};

const googleVerificationHandler: VerificationHandler = (accessToken, refreshToken, profile, done) => {
  done(null, profile);
};

const githubVerificationHandler: VerificationHandler = (accessToken, refreshToken, profile, done) => {
  done(null, profile);
};

const googleStrategy = new GoogleStrategy(googleStrategyOptions, googleVerificationHandler);
const githubStrategy = new GitHubStrategy(githubStrategyOptions, githubVerificationHandler);

passport.use(googleStrategy);
passport.use(githubStrategy);

passport.serializeUser((user, done) => {
  done(null, 'user');
});

passport.deserializeUser((user, done) => {
  done(null, user as Express.User);
});

export default passport;
