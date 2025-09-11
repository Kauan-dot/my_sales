import AppError from "@shared/errors/AppError";
import { Product } from "../infra/database/entities/Product";
import { productsRepositories } from "../infra/database/repositories/ProductsRepositories";
import RedisCache from "@shared/cache/RedisCache";

interface ICreateProduct {
    name: string;
    price: number;
    quantity: number;
}

export default class CreateProductService {
    async execute({name, price, quantity}: ICreateProduct): Promise<Product> {
        const productExists = await productsRepositories.findByName(name);

        if (productExists) {
            throw new AppError("Product already exists", 409);
        }

        const product = productsRepositories.create({
            name,
            price,
            quantity,
        });

        await productsRepositories.save(product);

        const redisCache = new RedisCache()
        await redisCache.invalidate("api-vendas-PRODUCT_LIST");        

        return product
    
    }
}