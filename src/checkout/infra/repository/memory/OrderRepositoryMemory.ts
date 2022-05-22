import IOrderRepository from '../../../domain/repository/IOrderRepository'
import Order from '../../../domain/entity/Order';

export default class OrderRepositoryMemory implements IOrderRepository {

    orders: Order[]

    constructor() {
        this.orders = []
    }

    async get(code: string): Promise<Order> {
        const order = this.orders.find(order => order.code.value === code);
        if (!order) throw new Error("Order not found");
        return order;
    }

    update(order: Order): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async save(order: Order): Promise<void> {
        this.orders.push(order)
    }

    async count(): Promise<number> {
        return this.orders.length
    }
}