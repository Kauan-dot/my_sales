import { Router } from 'express';
import OrdersControllers from '../controller/OrdersControllers';
import AuthMiddleware from '@shared/middlewares/authMiddleware';
import { createOrderValidate } from '../schemas/OrdersSchemas';
import { idParamsValidate } from 'modules/customers/infra/http/schemas/CustomerSchema';

const ordersRouter = Router();
const ordersController = new OrdersControllers();

ordersRouter.use(AuthMiddleware.execute);

ordersRouter.get('/:id', idParamsValidate, ordersController.show);
ordersRouter.post('/', createOrderValidate, ordersController.create);

export default ordersRouter
