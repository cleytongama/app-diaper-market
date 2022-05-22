import AbstractRepositoryFactory from "../../domain/factory/AbstractRepositoryFactory";
import ICouponRepository from "../../domain/repository/ICouponRepository";
import IItemRepository from "../../domain/repository/IItemRepository";
import IOrderRepository from "../../domain/repository/IOrderRepository";

import OrderRepositoryDatabase from '../repository/database/OrderRepositoryDatabase';
import CouponRepositoryDatabase from '../repository/database/CouponRepositoryDatabase';
import ItemRepositoryDatabase from '../repository/database/ItemRepositoryDatabase';
import DatabaseConnection from '../../../shared/infra/database/DatabaseConnection';

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