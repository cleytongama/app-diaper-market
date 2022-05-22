import Order from '../entity/Order';

export default interface IOrderRepository {
    save(order: Order): Promise<void>
    count(): Promise<number>
    update(order: Order): Promise<void>
    get(code: string): Promise<Order>
}