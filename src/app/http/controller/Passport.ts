import passport from 'passport'
import {
  Profile,
  Strategy as GoogleStrategy,
  VerifyCallback
} from 'passport-google-oauth20'
import { connectionPool as pool } from '@/providers/DBServiceProvider'
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt'
import * as express from 'express'
import LogHelper from '@/modules/LogHelper'

type verifyFunction = (
  req: express.Request,
  accessToken: string,
  refreshToken: string,
  profile: Profile,
  done: VerifyCallback
) => void

// Clowdee Sign Up / Sign in
const googleClowdeeCB: verifyFunction = (
  req,
  accessToken,
  refreshToken,
  profile,
  done
) => {
  pool.query(
    // 1. CLOWDEE DB Check
    "SELECT * FROM clowdees WHERE google_id ='" + profile.id + "'",
    (err, user) => {
      console.log('Searched User value: ' + JSON.stringify(user))
      if (err) {
        console.log('Err! during access to Clowdee DB')
        return done(err, null, 'User not found')
      }
      // 1-1. If no CLOWDEE user -> User Table check
      else if (user.length === 0) {
        console.log('Clowdee User 없음 -> User DB check')
        pool.query(
          // 1-1-. Check USER Table
          "SELECT * FROM users WHERE google_id = '" + profile.id + "'",
          (err, user) => {
            if (err) {
              console.log('Err! during access to User DB')
              return done(err, null, 'User not found')
            }
            // 1-1-1. If no User -> Sign UP in USER table & CLOWDEE table
            else if (user.length === 0) {
              console.log('User 없음 -> 회원가입')

              const insertUser =
                "INSERT INTO users values ('" +
                profile.id +
                "' , '" +
                profile.emails[0].value +
                "', '" +
                profile.displayName +
                "', '" +
                profile.photos[0].value +
                "'); "
              const insertClowdee =
                "INSERT INTO clowdees values ('" +
                profile.id +
                "', now(), now());"

              // 1-1-1. User Table INSERT & Clowdee Table INSERT
              pool.query(insertUser + insertClowdee, (err, result) => {
                if (err) {
                  console.log(err)
                  LogHelper.Instance.log('error', err.toString())
                  done(err, null, {
                    message: 'Sign up is not successful'
                  })
                } else {
                  console.log('Processing User & Clowdee Signed Up')

                  // 1-1-1. User Table recheck
                  pool.query(
                    "SELECT * FROM users WHERE google_id ='" + profile.id + "'",
                    (err, user) => {
                      if (!err && user.length !== 0) {
                        console.log(
                          'signed up and in / User value :' +
                            JSON.stringify(user[0])
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
                }
              })
            }
            // 1-1-2. No user in CLOWDEE Table but YES user in USER Table
            else {
              console.log('User DB found')
              pool.query(
                "INSERT INTO clowdees values ('" +
                  profile.id +
                  "', now(), now());",
                (err, result) => {
                  if (err) {
                    console.log('Error during insert clowdee DB')
                    LogHelper.Instance.log('error', err.toString())
                    done(err, null, {
                      message: 'Sign up is not successful'
                    })
                  } else {
                    console.log('Processing Signed Up (Only clowdee)')
                    // 1-1-2. User Table recheck
                    pool.query(
                      "SELECT * FROM users WHERE google_id ='" +
                        profile.id +
                        "'",
                      (err, user) => {
                        if (!err && user.length !== 0) {
                          console.log(
                            'signed up and in / User value :' +
                              JSON.stringify(user[0])
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
                  }
                }
              )
            }
          }
        )
      }
      // 1-2. CLOWDEE 있는 경우
      else {
        pool.query(
          "SELECT * FROM users WHERE google_id ='" + profile.id + "'",
          (err, user) => {
            if (err) {
              console.log('ERR during access to clowdee DB')
              return done(err, null, {
                message: 'Error'
              })
            } else {
              console.log('유저 있음')
              return done(null, user[0], {
                message: 'Sign In Succesfully'
              })
            }
          }
        )
      }
    }
  )
}

// Clowder Sign Up / Sign in
const googleClowderCB: verifyFunction = (
  req,
  accessToken,
  refreshToken,
  profile,
  done
) => {
  pool.query(
    // 1. CLOWDER DB Check
    "SELECT * FROM clowders WHERE google_id ='" + profile.id + "'",
    (err, user) => {
      console.log('Searched User value: ' + JSON.stringify(user))
      if (err) {
        console.log('Err! during access to Clowder DB')
        return done(err, null, 'User not found')
      }
      // 1-1. If no CLOWDER user -> User Table check
      else if (user.length === 0) {
        console.log('Clowder User 없음 -> User DB check')
        pool.query(
          // 1-1-. Check USER Table
          "SELECT * FROM users WHERE google_id = '" + profile.id + "'",
          (err, user) => {
            if (err) {
              console.log('Err! during access to User DB')
              return done(err, null, 'User not found')
            }
            // 1-1-1. If no User -> Sign UP in USER table & CLOWDER table
            else if (user.length === 0) {
              console.log('User 없음 -> 회원가입')

              const insertUser =
                "INSERT INTO users values ('" +
                profile.id +
                "' , '" +
                profile.emails[0].value +
                "', '" +
                profile.displayName +
                "', '" +
                profile.photos[0].value +
                "'); "
              const insertClowder =
                "INSERT INTO clowders values ('" +
                profile.id +
                "' ,0 , now(), now());"

              // 1-1-1. User Table INSERT & Clowdee Table INSERT
              pool.query(insertUser + insertClowder, (err, result) => {
                if (err) {
                  console.log(err)
                  LogHelper.Instance.log('error', err.toString())
                  done(err, null, {
                    message: 'Sign up is not successful'
                  })
                } else {
                  console.log('Processing User & Clowder Signed Up')

                  // 1-1-1. User Table recheck
                  pool.query(
                    "SELECT * FROM users WHERE google_id ='" + profile.id + "'",
                    (err, user) => {
                      if (!err && user.length !== 0) {
                        console.log(
                          'signed up and in / User value :' +
                            JSON.stringify(user[0])
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
                }
              })
            }
            // 1-1-2. No user in CLOWDER Table but YES user in USER Table
            else {
              console.log('User DB found')
              pool.query(
                "INSERT INTO clowders values ('" +
                  profile.id +
                  "' ,0 , now(), now());",
                (err, result) => {
                  if (err) {
                    console.log('Error during insert clowder DB')
                    LogHelper.Instance.log('error', err.toString())
                    done(err, null, {
                      message: 'Sign up is not successful'
                    })
                  } else {
                    console.log('Processing Signed Up (Only clowder)')
                    // 1-1-2. User Table recheck
                    pool.query(
                      "SELECT * FROM users WHERE google_id ='" +
                        profile.id +
                        "'",
                      (err, user) => {
                        if (!err && user.length !== 0) {
                          console.log(
                            'signed up and in / User value :' +
                              JSON.stringify(user[0])
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
                  }
                }
              )
            }
          }
        )
      }
      // 1-2. CLOWDER 있는 경우
      else {
        pool.query(
          "SELECT * FROM users WHERE google_id ='" + profile.id + "'",
          (err, user) => {
            if (err) {
              console.log('ERR during access to clowder DB')
              return done(err, null, {
                message: 'Error'
              })
            } else {
              console.log('유저 있음')
              return done(null, user[0], {
                message: 'Sign In Succesfully'
              })
            }
          }
        )
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
    googleClowdeeCB
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
    googleClowderCB
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
      'SELECT * FROM users WHERE google_id = ?',
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

/************************************************/
/*  Be ready for Local Strategy But not in user */
/************************************************/
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
