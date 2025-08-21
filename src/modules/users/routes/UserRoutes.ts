import { Router } from "express";
import UsersControllers from "../controllers/UsersControllers";
import { createUserSchema } from "../schemas/UserSchemas";

const usersRouter = Router();
const userController = new UsersControllers();

usersRouter.get("/", userController.index);
usersRouter.post("/", createUserSchema, userController.create);

export default usersRouter;