import ms from 'ms';
import dotenv from 'dotenv-safe';

dotenv.config();

export default {
  secret: process.env.SECRET,
  host: process.env.HOST,
  port: Number(process.env.PORT),
  mode: process.env.MODE,
  mongoUrl: process.env.MONGO_URL,
  tokenExpiration: ms(process.env.TOKEN_EXPIRATION),
  tickRate: Number(process.env.TICK_RATE),
}