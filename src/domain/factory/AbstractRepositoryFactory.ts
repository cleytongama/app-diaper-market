import ICouponRepository from "../repository/ICouponRepository";
import IOrderRepository from "../repository/IOrderRepository";
import ItemRepository from '../repository/IItemRepository';
import IItemRepository from "../repository/IItemRepository";

export default interface AbstractRepositoryFactory {
    orderRepository(): IOrderRepository
    couponRepository(): ICouponRepository
    itemRepository(): IItemRepository
}