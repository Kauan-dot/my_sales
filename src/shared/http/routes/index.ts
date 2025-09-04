import { Router } from "express";
import productsRouter from "modules/products/routes/ProductRoutes";
import avatarRoutes from "modules/users/routes/AvatarRoutes";
import sessionRouter from "modules/users/routes/SessionRoutes";
import usersRouter from "modules/users/routes/UserRoutes";
import express from "express";
import uploadConfig from "config/upload";
import passwordRouter from "modules/users/routes/PasswordRoutes";
import profileRouter from "modules/users/routes/ProfileRoutes";
import customersRouter from "modules/customers/routes/CustomerRoutes";

const routes = Router();

routes.get("/health", (request, response) => {
  return response.json({ message: "Hello Dev!" });
})
routes.use("/products", productsRouter)
routes.use("/users", usersRouter);
routes.use("/sessions", sessionRouter);
routes.use("/avatar", avatarRoutes);
routes.use("/files", express.static(uploadConfig.directory));
routes.use('/passwords', passwordRouter)
routes.use('/profiles', profileRouter)
routes.use('/customers', customersRouter)

export default routes;
