import { OrderDTO } from '../dto/OrderDTO';
import { OrderItemDTO } from '../dto/OrderItemDTO';

export default interface OrderDAO {

    getOrders(): Promise<OrderDTO.Output[]>;
    getOrder(code: string): Promise<OrderDTO.Output>;
    getOrderItems(idOrder: number): Promise<OrderItemDTO.Output[]>;
}