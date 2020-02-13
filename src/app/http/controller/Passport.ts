import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import pool from '@/providers/DBServiceProvider'
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt'

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.LOCALDOMAIN + '/v1/auth/login/redirect',
      passReqToCallback: true
    },
    function(req, accessToken, refreshToken, profile, done) {
      pool.query(
        // User 기
        "SELECT name FROM user WHERE name ='" + profile.id + "'",
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
                  console.log('Signed Up Succesfully')

                  pool.query(
                    "SELECT name FROM user WHERE name ='" + profile.id + "'",
                    (err, user) => {
                      if (!err && user.length !== 0) {
                        console.log(
                          'signed up and in / User value :' +
                            JSON.stringify(user)
                        )
                        return done(null, user[0], {
                          message: 'Sign Up & Sign in'
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
  )
)

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_secret
}

passport.use(
  new JWTStrategy(jwtOptions, (payload, done) => {
    pool.query(
      'SELECT name FROM user WHERE name = ?',
      [payload.sub],
      (err, user) => {
        console.log('jwt in')
        if (err) {
          console.log('payload: ' + payload)
          console.log('user: ' + user)
          return done(err, false)
        }
        if (user) {
          console.log('payload: ' + payload.sub)
          console.log('user: ' + user)
          return done(null, user)
        } else {
          return done(null, false)
        }
      }
      //   console.log('User value: ' + JSON.stringify(user))
      //   if (!user) {
      //     console.log('유저 없음')
      //     return done(err, null, 'User not found')
      //   } else {
      //     console.log('유저 있음')
      //     return done(null, user[0], {
      //       message: 'Looged In Succesfully'
      //     })
      //   }
      // }
    )
    console.log('fuck jwt' + JSON.stringify(payload))
    //  TODO payload 결괏값 보고 결정
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
