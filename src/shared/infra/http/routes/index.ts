import { Router } from "express";
import productsRouter from "modules/products/infra/http/routes/ProductRoutes";
import avatarRoutes from "modules/users/infra/http/routes/AvatarRoutes";
import sessionRouter from "modules/users/infra/http/routes/SessionRoutes";
import usersRouter from "modules/users/infra/http/routes/UserRoutes";
import express from "express";
import uploadConfig from "config/upload";
import passwordRouter from "modules/users/infra/http/routes/PasswordRoutes";
import profileRouter from "modules/users/infra/http/routes/ProfileRoutes";
import ordersRouter from "modules/orders/infra/http/routes/OrdersRoutes";
import customersRouter from "modules/customers/infra/http/routes/CustomerRoutes";

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
routes.use('/orders', ordersRouter)

export default routes;
