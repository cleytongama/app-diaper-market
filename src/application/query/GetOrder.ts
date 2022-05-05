import { GetOrderDTO } from "../dto/GetOrderDTO";
import OrderDAO from "./IOrderDAO";

export default class GetOrder {

    constructor(readonly orderDAO: OrderDAO) { }

    async execute(code: string): Promise<GetOrderDTO.Output> {
        const orderData = await this.orderDAO.getOrder(code);
        const orderItemsData = await this.orderDAO.getOrderItems(orderData.id);
        const getOrderOutput = new GetOrderDTO.Output({
            code: orderData.code,
            cpf: orderData.cpf,
            items: orderItemsData,
            freight: orderData.freight,
            total: orderData.total
        });
        return getOrderOutput;
    }
}