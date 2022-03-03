import Order from '../entity/Order';

export default interface IOrderRepository {
    save(order: Order): void
}