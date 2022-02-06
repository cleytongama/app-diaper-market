import Coupon from './Coupon';
import Cpf from './Cpf';
import Item from './Item';
import OrderItem from './OrderItem';

export default class Order {
    items: OrderItem[];
    cpf: Cpf;
    coupon: Coupon | undefined;

    constructor({ cpf }: { cpf: string }) {
        this.cpf = new Cpf(cpf);
        this.items = [];
    }

    addItem(item: Item, quantity: number) {
        this.items.push(new OrderItem({ code: item.idItem, price: item.price, quantity: quantity }));
    }

    addCoupon(coupon: Coupon) {
        this.coupon = coupon;
    }

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