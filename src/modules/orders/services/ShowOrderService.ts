import { Order } from "../database/entities/Order";
import { orderRepositories } from "../database/repositories/OrderRepositories";

export class ShowOrderService {
    async execute(id: string): Promise<Order> {
        const order = await orderRepositories.findDById(Number(id));

        if (!order) {
            throw new Error("Order not found");
        }

        return order;
    }
}