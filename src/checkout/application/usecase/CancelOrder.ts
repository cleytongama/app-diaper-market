import AbstractRepositoryFactory from "../../domain/factory/AbstractRepositoryFactory";
import EventBus from "../../../shared/infra/event/EventBus";
import OrderCancelled from "../../../shared/domain/event/OrderCancelled";
import IOrderRepository from "../../domain/repository/IOrderRepository";

export default class CancelOrder {
    orderRepository: IOrderRepository;

    constructor(abstractRepositoryFactory: AbstractRepositoryFactory, readonly eventBus: EventBus) {
        this.orderRepository = abstractRepositoryFactory.orderRepository();
    }

    async execute(code: string): Promise<void> {
        const order = await this.orderRepository.get(code);
        order.cancel();
        console.log("Order>>>", order);
        await this.orderRepository.update(order);
        const items = order.getOrderItems().map(orderItem => ({ idItem: orderItem.code, quantity: orderItem.quantity }));
        this.eventBus.publish(new OrderCancelled(code, items));
    }
}