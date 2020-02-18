import passport from 'passport'
import {
  Profile,
  Strategy as GoogleStrategy,
  VerifyCallback
} from 'passport-google-oauth20'
import pool from '@/providers/DBServiceProvider'
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt'
import LogHelper from '@/modules/LogHelper'
import * as express from 'express'

type verifyFunction = (
  req: express.Request,
  accessToken: string,
  refreshToken: string,
  profile: Profile,
  done: VerifyCallback
) => void

const googleCB: verifyFunction = (
  req,
  accessToken,
  refreshToken,
  profile,
  done
) => {
  pool.query(
    // User 기
    "SELECT * FROM user WHERE googleID ='" + profile.id + "'",
    (err, user) => {
      console.log('Searched User value: ' + JSON.stringify(user))

      // User 없거나 Error 존재하는 경우
      if (err) {
        console.log('잘못된 접근')
        return done(err, null, 'User not found')
      } else if (user.length === 0) {
        console.log('유저 없음 회원가입 -> DB check')
        pool.query(
          "INSERT INTO user values ('" +
            profile.id +
            "' , '" +
            profile.emails[0].value +
            "', '" +
            profile.photos[0].value +
            "', '" +
            profile.displayName +
            "', now(), now())",
          (err, result) => {
            if (!err) {
              console.log('Processing Signed Up')

              pool.query(
                "SELECT * FROM user WHERE googleID ='" + profile.id + "'",
                (err, user) => {
                  if (!err && user.length !== 0) {
                    console.log(
                      'signed up and in / User value :' + JSON.stringify(user)
                    )
                    return done(null, user[0], {
                      message: 'Sign Up & Sign in'
                    })
                  } else {
                    done(err, null, {
                      message: 'Sign up failed!'
                    })
                  }
                }
              )
            } else {
              done(err, null, {
                message: 'Sign up is not successful'
              })
            }
          }
        )
      } else {
        // User 있는 경우
        console.log('유저 있음')
        return done(null, user[0], {
          message: 'Sign In Succesfully'
        })
      }
    }
  )
}

passport.use(
  'clowdee',
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.LOCALDOMAIN + '/v1/auth/clowdee/login/redirect',
      passReqToCallback: true
    },
    googleCB
  )
)

passport.use(
  'clowder',
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.LOCALDOMAIN + '/v1/auth/clowder/login/redirect',
      passReqToCallback: true
    },
    googleCB
  )
)

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_secret
}

passport.use(
  new JWTStrategy(jwtOptions, (payload, done) => {
    console.log('JWT check' + payload.sub)
    pool.query(
      'SELECT * FROM user WHERE googleID = ?',
      [payload.sub],
      (err, user) => {
        if (err) {
          return done(err, false)
        }
        if (user) {
          console.log('JWT check Successful')
          return done(null, user[0])
        } else {
          return done(null, false)
        }
      }
    )
  })
)

// passport.use(
//   new LocalStrategy(
//     {
//       usernameField: 'grjs9611',
//       passwordField: 'RyuJaesang'
//     },
//     (email, password, done) => {
//       return pool.query(
//         //DB check (ID && pw needed)
//         'SELECT googleId FROM user WHERE googleID=?',
//         [password],
//         (err, result, feilds) => {
//           if (!err && result.length !== 0) {
//             return done(null, result, { message: 'Looged In Succesfully' })
//           }
//           return done(null, false, {
//             message: 'Incorrect email or password.'
//           })
//         }
//       )
//     }
//   )
//
// return pool.query(
//   'SELECT googleID FROM user WHERE googleID=?',
//   [payload],
//   (err, user, fields) => {}
//   )

export default passport
