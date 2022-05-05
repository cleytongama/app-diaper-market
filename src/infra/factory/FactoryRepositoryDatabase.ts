import AbstractRepositoryFactory from "../../domain/factory/AbstractRepositoryFactory";
import ICouponRepository from "../../domain/repository/ICouponRepository";
import IItemRepository from "../../domain/repository/IItemRepository";
import IOrderRepository from "../../domain/repository/IOrderRepository";
import DatabaseConnection from "../database/DatabaseConnection";
import OrderRepositoryDatabase from '../repository/database/OrderRepositoryDatabase';
import CouponRepositoryDatabase from '../repository/database/CouponRepositoryDatabase';
import ItemRepositoryDatabase from '../repository/database/ItemRepositoryDatabase';

export class FactoryRepositoryDatabase implements AbstractRepositoryFactory {

    constructor(readonly databaseConnection: DatabaseConnection) { }

    orderRepository(): IOrderRepository {
        return new OrderRepositoryDatabase(this.databaseConnection)
    }
    couponRepository(): ICouponRepository {
        return new CouponRepositoryDatabase(this.databaseConnection)
    }
    itemRepository(): IItemRepository {
        return new ItemRepositoryDatabase(this.databaseConnection)
    }
}