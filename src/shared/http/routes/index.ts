import { Router } from "express";
import productsRouter from "modules/products/routes/ProductRoutes";

const routes = Router();

routes.get("/health", (request, response) => {
  return response.json({ message: "Hello Dev!" });
})
routes.use("/products", productsRouter)

export default routes;
