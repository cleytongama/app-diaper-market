import Coupon from './Coupon';
import Cpf from './Cpf';
import Item from './Item';
import OrderItem from './OrderItem';
import OrderCode from './OrderCode';

type OrderType = {
    cpf: string,
    issueDate: Date,
    sequence: number
}
export default class Order {
    code: OrderCode;
    items: OrderItem[];
    cpf: Cpf;
    coupon: Coupon | undefined;
    freigth: number;
    issueDate: Date;
    sequence: number;
    status: string;
    constructor({ cpf, issueDate = new Date(), sequence = 1 }: OrderType) {
        this.code = new OrderCode(issueDate, sequence)
        this.cpf = new Cpf(cpf);
        this.issueDate = issueDate
        this.sequence = sequence
        this.items = [];
        this.freigth = 0
        this.status = "pending"
    }

    addItem(item: Item, quantity: number) {
        this.items.push(new OrderItem({ code: item.idItem, price: item.price, quantity: quantity }));
    }

    addCoupon(coupon: Coupon) {
        if (coupon.isExpired()) throw new Error("expired coupon")
        this.coupon = coupon;
    }
    cancel() {
        this.status = "cancelled";
    }
    getCpf() { return this.cpf.value }

    getCode() { return this.code.value }

    getOrderItems() { return this.items }

    getCoupon() { return this.coupon?.code }

    getFreight() { return this.freigth }

    setFreight(freigth: number) { this.freigth = freigth }

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