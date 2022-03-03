import IItemRepository from "../../domain/repository/IItemRepository";
import IOrderRepository from "../../domain/repository/IOrderRepository";
import Order from "../../domain/entity/Order";
import { PlaceOrderDTO } from '../dto/PlaceOrderDTO';

export default class PlaceOrder {
    constructor(readonly itemRespository: IItemRepository, readonly orderRepository: IOrderRepository) { }

    async execute(input: PlaceOrderDTO.Input): Promise<PlaceOrderDTO.Output> {
        const order = new Order({ cpf: input.cpf });
        for (const orderItem of input.orderItems) {
            const item = await this.itemRespository.findById(orderItem.idItem);
            order.addItem(item, orderItem.quantity);
        }

        await this.orderRepository.save(order)
        return {
            total: order.getTotalOrderItems()
        }
    }
}