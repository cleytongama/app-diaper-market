import Coupon from './Coupon';
import Cpf from './Cpf';
import Item from './Item';
import OrderItem from './OrderItem';

export default class Order {
    items: OrderItem[];
    cpf: Cpf;
    coupon: Coupon | undefined;
    freigth: number;
    constructor({ cpf, issueDate = new Date() }: { cpf: string; issueDate?: Date; }) {
        this.cpf = new Cpf(cpf);
        this.items = [];
        this.freigth = 0
    }

    addItem(item: Item, quantity: number) {
        this.freigth += item.getFreight() * quantity
        this.items.push(new OrderItem({ code: item.idItem, price: item.price, quantity: quantity }));
    }

    addCoupon(coupon: Coupon) {
        if (coupon.isExpired()) throw new Error("expired coupon")
        this.coupon = coupon;
    }

    getFreight() { return this.freigth }

    getNumItems() { return this.items.length; }

    getTotalOrderItems() {
        let total = this.items.reduce((total, item) => {
            total += item.getTotal()
            return total
        }, 0)

        if (this.coupon) {
            total -= (total * this.coupon.percentage) / 100
        }
        return total
    }
}