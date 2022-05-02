import IOrderRepository from '../../../domain/repository/IOrderRepository'
import Order from '../../../domain/entity/Order';

export default class OrderRepositoryMemory implements IOrderRepository {

    order: Order[]

    constructor() {
        this.order = []
    }

    async save(order: Order): Promise<void> {
        this.order.push(order)
    }
}