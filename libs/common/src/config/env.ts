import * as dotenv from 'dotenv';

dotenv.config();

export const ENV = {
  PORT: {
    AUTH: process.env.PORT_AUTH,
    RESERVATION: process.env.PORT_RESERVATION,
    PAYMENT: process.env.PORT_PAYMENT,
    NOTIFICATION: process.env.PORT_NOTIFICATION,
    TCP: process.env.PORT_TCP,
  },
  MONGODB_URI: process.env.MONGODB_URI,
  JWT: {
    SECRET: process.env.JWT_SECRET,
    EXPIRATION: process.env.JWT_EXPIRATION,
  },
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
};
