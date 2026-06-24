import { cleanEnv, str, num } from "envalid";

export default cleanEnv(process.env, {
  PORT: num(),
  MONGO_URI: str(),
  ACCESS_TOKEN_SECRET_KEY: str(),
  REFRESH_TOKEN_SECRET_KEY: str(),
});