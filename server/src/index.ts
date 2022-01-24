import { MikroORM } from "@mikro-orm/core";
import mikroOrmConfig from "./mikro-orm.config";
import express from "express";

const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  //will run migrations automatically
  await orm.getMigrator().up();

  const app = express();
  app.listen(4000, () => {
    console.log(`server started at port localhost:4000`);
  });

  app.get("/", (_, res) => {
    res.send("hello");
  });
};

main().catch((err) => console.error(err));
