'use strict'
module.exports = {
  NODE_ENV: '"production"',
  API_URL: `'${process.env.API_URL}'`,
  WEB_URL: `'${process.env.WEB_URL}'`,
  APP_URL: `'${process.env.APP_URL}'`,
  SENTRY_URL: `'${process.env.SENTRY_URL}'`,
  SEGMENT_ID: `'${process.env.SEGMENT_ID}'`,
  INTERCOM_SECRET_KEY: `'${process.env.INTERCOM_SECRET_KEY}'`,
  INTERCOM_APP_ID: `'${process.env.INTERCOM_APP_ID}'`,
  STRIPE_SECRET_KEY: `'${process.env.STRIPE_SECRET_KEY}'`,
  STRIPE_PUBLISHABLE_KEY: `'${process.env.STRIPE_PUBLISHABLE_KEY}'`
}
