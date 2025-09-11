import { Router } from "express";
import UsersControllers from "../controllers/UsersControllers";
import { createUserSchema } from "../schemas/UserSchemas";
import AuthMiddleware from "@shared/middlewares/authMiddleware";

const usersRouter = Router();
const userController = new UsersControllers();

usersRouter.get("/", AuthMiddleware.execute, userController.index);
usersRouter.post("/", createUserSchema, userController.create);

export default usersRouter;