import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import mikroOrmConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";

const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  //will run migrations automatically
  await orm.getMigrator().up();

  const app = express();

  const appoloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver],
      validate: false,
    }),

    context: () => ({ em: orm.em }),
  });

  await appoloServer.start();
  appoloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log(`server started at port localhost:4000`);
  });
};

main().catch((err) => console.error(err));
