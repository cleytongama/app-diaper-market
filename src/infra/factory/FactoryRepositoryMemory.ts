import AbstractRepositoryFactory from "../../domain/factory/AbstractRepositoryFactory";
import ICouponRepository from "../../domain/repository/ICouponRepository";
import IItemRepository from "../../domain/repository/IItemRepository";
import IOrderRepository from "../../domain/repository/IOrderRepository";
import OrderRepositoryMemory from '../repository/memory/OrderRepositoryMemory';
import CouponRepositoryMemory from '../repository/memory/CouponRepositoryMemory';
import ItemRepositoryMemory from '../repository/memory/ItemRepositoryMemory';

export class FactoryRepositoryMemory implements AbstractRepositoryFactory {
    orderRepository(): IOrderRepository {
        return new OrderRepositoryMemory()
    }
    couponRepository(): ICouponRepository {
        return new CouponRepositoryMemory()
    }
    itemRepository(): IItemRepository {
        return new ItemRepositoryMemory()
    }
}