import IItemRepository from "../../domain/repository/IItemRepository";
import IOrderRepository from "../../domain/repository/IOrderRepository";
import ICouponRepository from '../../domain/repository/ICouponRepository';
import Order from "../../domain/entity/Order";
import { PlaceOrderDTO } from '../dto/PlaceOrderDTO';

export default class PlaceOrder {
    constructor(readonly itemRespository: IItemRepository, readonly orderRepository: IOrderRepository, readonly couponRepository: ICouponRepository) { }

    async execute(input: PlaceOrderDTO.Input): Promise<PlaceOrderDTO.Output> {
        const order = new Order({ cpf: input.cpf, issueDate: input.issueDate, sequence: 1 });
        for (const orderItem of input.orderItems) {
            const item = await this.itemRespository.findById(orderItem.idItem);
            order.addItem(item, orderItem.quantity);
        }
        if (input.coupon) {
            const coupon = await this.couponRepository.findByCode(input.coupon);
            order.addCoupon(coupon);
        }
        await this.orderRepository.save(order)
        const total = order.getTotalOrderItems();
        return new PlaceOrderDTO.Output(total)
    }
}