import IOrderRepository from '../../../domain/repository/IOrderRepository'
import Order from '../../../domain/entity/Order';

export default class OrderRepositoryMemory implements IOrderRepository {

    orders: Order[]

    constructor() {
        this.orders = []
    }

    async save(order: Order): Promise<void> {
        this.orders.push(order)
    }

    async count(): Promise<number> {
        return this.orders.length
    }
}