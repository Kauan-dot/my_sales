import { Router } from "express";
import productsRouter from "modules/products/routes/ProductRoutes";
import avatarRoutes from "modules/users/routes/AvatarRoutes";
import sessionRouter from "modules/users/routes/SessionRoutes";
import usersRouter from "modules/users/routes/UserRoutes";
import express from "express";
import uploadConfig from "config/upload";

const routes = Router();

routes.get("/health", (request, response) => {
  return response.json({ message: "Hello Dev!" });
})
routes.use("/products", productsRouter)
routes.use("/users", usersRouter);
routes.use("/sessions", sessionRouter);
routes.use("/avatar", avatarRoutes);
routes.use("/files", express.static(uploadConfig.directory));

export default routes;
