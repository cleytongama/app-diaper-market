import IOrderRepository from '../../../domain/repository/IOrderRepository'
import Order from '../../../domain/entity/Order';
import DatabaseConnection from "../../../../shared/infra/database/DatabaseConnection";
import Coupon from '../../../domain/entity/Coupon';
import Item from '../../../domain/entity/Item';

export default class OrderRepositoryDatabase implements IOrderRepository {

    constructor(readonly databaseConnection: DatabaseConnection) { }

    async save(order: Order): Promise<void> {
        const [orderData] = await this.databaseConnection.query(`
			insert into 
				diapers.orders
			(
				code, cpf, issue_date, freight, sequence, coupon, total, status
			) 
			values 
			(
				$1, $2, $3, $4, $5, $6, $7, $8
			) 
			returning *`,
            [
                order.getCode(),
                order.getCpf(),
                order.issueDate,
                order.getFreight(),
                order.sequence,
                order.getCoupon(),
                order.getTotalOrderItems(),
                order.status
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
    }

    async get(code: string): Promise<Order> {
        const [orderData] = await this.databaseConnection.query("select * from diapers.orders where code = $1", [code]);
        const order = new Order({
            cpf: orderData.cpf,
            issueDate: orderData.issue_date,
            sequence: orderData.sequence
        });
        const orderItemsData = await this.databaseConnection.query("select * from diapers.order_items where id_order = $1", [orderData.id]);
        for (const orderItemData of orderItemsData) {
            const [itemData] = await this.databaseConnection.query("select * from diapers.items where id = $1", [orderItemData.code]);
            const item = new Item(itemData.id, itemData.category, itemData.description, itemData.price, itemData.width, itemData.height, itemData.length, itemData.weight);
            order.addItem(item, orderItemData.quantity);
        }
        order.setFreight(orderData.freight);
        const [couponData] = await this.databaseConnection.query("select * from diapers.coupons where code = $1", [orderData.coupon]);
        if (couponData) {
            const coupon = new Coupon(couponData.code, couponData.percentage, couponData.expire_date);
            order.addCoupon(coupon);
        }
        return order;
    }

    async update(order: Order): Promise<void> {
        console.log("Order update>>", order)
        await this.databaseConnection.query("update diapers.orders set status = $1 where code = $2", [order.status, order.code.value]);
    }

    async count() {
        const [data] = await this.databaseConnection.query("select count(*)::int from diapers.orders", []);
        return data.count;
    }
}
