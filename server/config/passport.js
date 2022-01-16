import GoogleToken from 'passport-google-token'
import mongoose from 'mongoose';
import User from '../model/User.js';

const GoogleTokenStrategy = GoogleToken.Strategy

function PassportConfig(passport) {
  passport.use(
    new GoogleTokenStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      },
      function (accessToken, refreshToken, profile, done) {
        User.upsertGoogleUser(accessToken, refreshToken, profile, function(err, user) {
          return done(err, user);
        });
      }
    )
  )

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user))
  })
}

export default PassportConfig