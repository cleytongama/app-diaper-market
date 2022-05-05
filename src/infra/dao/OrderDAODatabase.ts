import { OrderDTO } from "../../application/dto/OrderDTO";
import { OrderItemDTO } from "../../application/dto/OrderItemDTO";
import DatabaseConnection from "../database/DatabaseConnection";
import OrderDAO from '../../application/query/IOrderDAO';


export default class OrderDAODatabase implements OrderDAO {

    constructor(readonly databaseConnection: DatabaseConnection) {
    }

    async getOrders(): Promise<OrderDTO.Output[]> {
        const orderData = await this.databaseConnection.query("select id, code, cpf, freight::float, total::float from diapers.orders", []);
        return orderData;
    }

    async getOrder(code: string): Promise<OrderDTO.Output> {
        const [orderData] = await this.databaseConnection.query("select id, code, cpf, freight::float, total::float from diapers.orders where code = $1", [code]);
        return orderData;
    }

    async getOrderItems(idOrder: number): Promise<OrderItemDTO.Output[]> {
        const orderItemsData = await this.databaseConnection.query("select i.description, oi.quantity, oi.price::float from diapers.order_items oi join diapers.items i on (oi.code = i.id) where id_order = $1", [idOrder]);
        return orderItemsData;
    }


}