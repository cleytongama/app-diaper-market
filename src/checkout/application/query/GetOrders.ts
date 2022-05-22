import { GetOrderDTO } from "../dto/GetOrderDTO";
import OrderDAO from "./IOrderDAO";

export default class GetOrders {

    constructor(readonly orderDAO: OrderDAO) { }

    async execute(): Promise<GetOrderDTO.Output[]> {
        const ordersData = await this.orderDAO.getOrders();
        const getOrdersOutput: GetOrderDTO.Output[] = [];
        for (const orderData of ordersData) {
            const orderItemsData = await this.orderDAO.getOrderItems(orderData.id);
            const getOrderOutput = new GetOrderDTO.Output(
                {
                    code: orderData.code,
                    cpf: orderData.cpf,
                    items: orderItemsData,
                    freight: orderData.freight,
                    total: orderData.total
                }
            );
            getOrdersOutput.push(getOrderOutput);
        }
        return getOrdersOutput;
    }
}