import { Post } from "./entities/post";
import { isProduction } from "./constants";
import { IDatabaseDriver, Options } from "@mikro-orm/core";
import path from "path";

export default {
  entities: [Post],
  dbName: "lireddit",
  user: "postgres",
  password: "postgres",
  type: "postgresql",
  debug: !isProduction,
  migrations: {
    path: path.join(__dirname, "./migrations"),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
} as Options<IDatabaseDriver>;
