import { Router } from "express";
import productsRouter from "modules/products/routes/ProductRoutes";
import usersRouter from "modules/users/routes/UserRoutes";

const routes = Router();

routes.get("/health", (request, response) => {
  return response.json({ message: "Hello Dev!" });
})
routes.use("/products", productsRouter)
routes.use("/users", usersRouter);

export default routes;
