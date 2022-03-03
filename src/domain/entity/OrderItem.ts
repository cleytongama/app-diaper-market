export default class OrderItem {
    code: number;
    price: number;
    quantity: number;
    constructor({ code, price, quantity }: { code: number; price: number; quantity: number; }) {
        this.code = code;
        this.price = price;
        this.quantity = quantity;
    }

    getTotal() {
        return this.price * this.quantity
    }
}