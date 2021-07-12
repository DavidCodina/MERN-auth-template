const passport         = require('passport');
const AmazonStrategy   = require('passport-amazon').Strategy;
const GithubStrategy   = require('passport-github').Strategy;
const GoogleStrategy   = require('passport-google-oauth20').Strategy;
const keys             = require('./keys');
const User             = require('../models/userModel');


/* =============================================================================

============================================================================= */


passport.serializeUser((user, done) => {
  return done(null, user._id);
});


passport.deserializeUser((id, done) => {
  User.findById(id, (err, doc) => {
    return done(null, doc);
  })
});


/* =============================================================================

============================================================================= */


passport.use(
  new AmazonStrategy(
    {
      clientID:     keys.AMAZON.clientID,
      clientSecret: keys.AMAZON.clientSecret,
      callbackURL:  '/auth/amazon/callback' 
    },

    (accessToken, refreshToken, profile, done) => {
      User.findOne({ amazonId: profile.id }, async (err, doc) => {
        if (err){ return done(err, null); }
  
        if (!doc){
          const newUser = new User({
            amazonId: profile.id,
            username: profile.displayName
          });
  
          await newUser.save();
          return done(null, newUser);
        }
        done(null, doc);
      });
    } // End of callback function.
  ) // End of new *Strategy( ... )
); // End of passport.use( ... )


/* =============================================================================

============================================================================= */


passport.use(
  new GithubStrategy(
    {
      clientID:     keys.GITHUB.clientID,
      clientSecret: keys.GITHUB.clientSecret,
      callbackURL:  '/auth/github/callback' 
    },

    (accessToken, refreshToken, profile, done) => {
      User.findOne({ githubId: profile.id }, async (err, doc) => {
        if (err){ return done(err, null); }
  
        if (!doc){
          const newUser = new User({
            githubId: profile.id,
            username: profile.username
          });
  
          await newUser.save();
          return done(null, newUser);
        }
        done(null, doc);
      });
    } // End of callback function.
  ) // End of new *Strategy( ... )
); // End of passport.use( ... )


/* =============================================================================

============================================================================= */


passport.use(
  new GoogleStrategy(
    {
      clientID:     keys.GOOGLE.clientID,     
      clientSecret: keys.GOOGLE.clientSecret, 
      callbackURL:  '/auth/google/callback' 
    },

    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }, async (err, doc) => {
        if (err){ return done(err, null); }
  
        if (!doc){
          const newUser = new User({
            googleId: profile.id,
            username: profile.name.givenName 
          });
  
          await newUser.save();
          return done(null, newUser);
        }

        done(null, doc);
      }); // End of User.findOne( ... )
    } // End of callback function.
  ) // End of new *Strategy( ... )
); // End of passport.use( ... )