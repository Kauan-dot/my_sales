import "reflect-metadata";
import "express-async-errors";
import express from "express";
import cors from "cors";

import routes from "./routes";
import ErrorHandleMiddleware from "../middlewares/ErrorHandleMiddleware";
import { AppDataSource } from "../typeorm/data-source";
import { errors } from "celebrate";
import rateLimiter from "@shared/middlewares/rateLimiter";

AppDataSource.initialize()
  .then(async () => {
    const app = express();
  
    app.use(cors());
    app.use(express.json());

    app.use(rateLimiter)
  
    app.use(routes);
    app.use(errors())
    app.use(ErrorHandleMiddleware.handdleError);
  
    app.listen(3333, () => {
    console.log("Server is running on port 3333");
  })})
  .catch(
    error => {
      console.error('Failed to connect to the database:', error);
    }
  )

