import IOrderRepository from '../../../domain/repository/IOrderRepository'
import Order from '../../../domain/entity/Order';

export default class OrderRepositoryMemory implements IOrderRepository {

    order: Order[]

    constructor() {
        this.order = []
    }

    save(order: Order): void {
        this.order.push(order)
    }
}