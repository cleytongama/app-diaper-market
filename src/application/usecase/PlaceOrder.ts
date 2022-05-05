import IItemRepository from "../../domain/repository/IItemRepository";
import IOrderRepository from "../../domain/repository/IOrderRepository";
import ICouponRepository from '../../domain/repository/ICouponRepository';
import Order from "../../domain/entity/Order";
import { PlaceOrderDTO } from '../dto/PlaceOrderDTO';
import AbstractRepositoryFactory from '../../domain/factory/AbstractRepositoryFactory';
import FreightCalculator from "../../domain/service/FreightCalculator";

export default class PlaceOrder {
    orderRepository: IOrderRepository;
    couponRepository: ICouponRepository;
    itemRespository: IItemRepository;
    constructor(abstractRepositoryFactory: AbstractRepositoryFactory) {
        this.orderRepository = abstractRepositoryFactory.orderRepository()
        this.couponRepository = abstractRepositoryFactory.couponRepository()
        this.itemRespository = abstractRepositoryFactory.itemRepository()
    }

    async execute(input: PlaceOrderDTO.Input): Promise<PlaceOrderDTO.Output> {
        let sequence = await this.orderRepository.count() + 1;
        const order = new Order({ cpf: input.cpf, issueDate: input.issueDate, sequence });
        let freight = 0;
        for (const orderItem of input.orderItems) {
            const item = await this.itemRespository.findById(orderItem.idItem);
            freight += FreightCalculator.calculate(item) * orderItem.quantity;
            order.addItem(item, orderItem.quantity);
        }
        order.setFreight(freight);
        if (input.coupon) {
            const coupon = await this.couponRepository.findByCode(input.coupon);
            order.addCoupon(coupon);
        }
        await this.orderRepository.save(order)
        const total = order.getTotalOrderItems();
        const code = order.getCode();
        return new PlaceOrderDTO.Output(code, total)
    }
}