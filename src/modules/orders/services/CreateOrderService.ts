import AppError from "@shared/errors/AppError";
import { customerRepository } from "modules/customers/infra/database/repositories/CustomerRepositories";
import { Product } from "modules/products/database/entities/Product";
import { productsRepositories } from "modules/products/database/repositories/ProductsRepositories";
import { orderRepositories } from "../database/repositories/OrderRepositories";
import { Order } from "../database/entities/Order";

interface ICreateOrder {
    customer_id: string;
    products: Product[];
}

export class CreateOrderService {
    async execute({customer_id, products}: ICreateOrder): Promise<Order> {
        const customerExists = await customerRepository.findById(Number(customer_id));
        if (!customerExists) {
            throw new AppError('Cold not find any customer with the given id.');
        }

        
        const existsProducts = await productsRepositories.findAllByIds(products);

        if (!existsProducts.length) {
            throw new AppError('Could not find any products with the given ids.');
        }

        const existsProductsIds = existsProducts.map(product => product.id);

        const checkInexistentProducts = products.filter(
            product => !existsProductsIds.includes(product.id),
        );

        if (checkInexistentProducts.length) {
            throw new AppError(`Could not find product ${checkInexistentProducts[0].id}.`, 404);
        }

        const quantityAvailable = products.filter(
            product =>
                existsProducts.filter(
                    productExist => productExist.id === product.id
                )[0].quantity < product.quantity,
        );

        if (!quantityAvailable.length) {
            throw new AppError(
                `The quantity is not available.`, 409
            );
        }

        const serializedProducts = products.map(product => ({
            product_id: product.id,
            quantity: product.quantity,
            price: existsProducts.filter(p => p.id === product.id)[0].price,
        }));

        const order = await orderRepositories.createOrder({
            customer: customerExists,
            products: serializedProducts,
        });

        const { order_products } = order;
        
        const updatedProductQuantity = order_products.map(product => ({
            id: product.product_id,
            quantity:
                existsProducts.filter(p => p.id === product.product_id)[0].quantity - product.quantity,
        }));

        await productsRepositories.save(updatedProductQuantity);

        return order
    }
}