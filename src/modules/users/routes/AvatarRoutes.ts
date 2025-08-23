import { Router } from "express";
import UpdateAvatarControllers from "../controllers/UpdateAvatarController";
import multer from "multer";
import uploadConfig from "../../../config/upload";
import AuthMiddleware from "@shared/middlewares/authMiddleware";

const avatarRoutes = Router();
const userAvatarControllers = new UpdateAvatarControllers();
const upload = multer(uploadConfig);

avatarRoutes.patch(
    "/",
    AuthMiddleware.execute,
    upload.single("avatar"),
    userAvatarControllers.update
);

export default avatarRoutes;