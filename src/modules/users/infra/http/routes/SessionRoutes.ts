import { Router } from "express";
import SessionsControllers from "../controllers/SessionsControllers";
import { sessionSchema } from "../schemas/SessionSchema";

const sessionRouter = Router();
const sessionController = new SessionsControllers();

sessionRouter.post("/", sessionSchema, sessionController.create);

export default sessionRouter;