import { Router } from 'express';
import { passport } from '../services';
import { CLIENT_URL } from '../config/environment';

export const authRoute = Router();

authRoute.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
authRoute.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: `${CLIENT_URL}/dashboard`,
    failureRedirect: `${CLIENT_URL}/registration/banned`,
  }),
);

/**
 * @link https://github.com/cfsghost/passport-github#readme
 */
authRoute.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
authRoute.get(
  '/github/callback',
  passport.authenticate('github', {
    successRedirect: `${CLIENT_URL}/dashboard`,
    failureRedirect: `${CLIENT_URL}/registration/banned`,
  }),
);

authRoute.get('logout', (req, res) => {
  req.logOut();
  res.redirect(CLIENT_URL);
});
