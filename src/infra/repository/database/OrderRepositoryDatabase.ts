import IOrderRepository from '../../../domain/repository/IOrderRepository'
import Order from '../../../domain/entity/Order';
import DatabaseConnection from '../../database/DatabaseConnection';

export default class OrderRepositoryDatabase implements IOrderRepository {

    constructor(readonly databaseConnection: DatabaseConnection) { }

    async save(order: Order): Promise<void> {

        // begin
        const [orderData] = await this.databaseConnection.query(`
			insert into 
				diapers.orders
			(
				code, cpf, issue_date, freight, sequence, coupon
			) 
			values 
			(
				$1, $2, $3, $4, $5, $6
			) 
			returning *`,
            [
                order.getCode(),
                order.getCpf(),
                order.issueDate,
                order.getFreight(),
                order.sequence,
                order.getCoupon()
            ]
        );
        for (const orderItem of order.getOrderItems()) {
            await this.databaseConnection.query(`
				insert into
					diapers.order_items
				(
					id_order, code, price, quantity
				)
				values
				(
					$1, $2, $3, $4
				)
			`,
                [
                    orderData.id, orderItem.code, orderItem.price, orderItem.quantity
                ]
            )
        }
        // commit
    }
}
