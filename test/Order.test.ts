import Coupon from '../src/Coupon';
import Item from '../src/Item';
import Order from '../src/Order';

let order: Order;

beforeEach(() => {
    order = new Order({ cpf: "000.584.842-30" });
})

describe('Class Order', () => {

    test("Deve informar um cpf válido", function () {

    })

    test("Deve criar um pedido com 3 itens", function () {
        order.addItem(new Item(1, "XG", 'Franlda XG', 10), 1)
        order.addItem(new Item(2, "G", 'Franlda XG', 10), 1)
        order.addItem(new Item(3, "XG", 'Franlda XG', 10), 1)
        expect(order.getNumItems()).toBe(3);
    });

    test("Deve obter o valor total do itens", function () {
        order.addItem(new Item(1, "XG", 'Franlda XG', 10), 1)
        order.addItem(new Item(2, "G", 'Franlda XG', 20), 1)
        order.addItem(new Item(3, "XG", 'Franlda XG', 30), 1)
        expect(order.getTotalOrderItems()).toBe(60);
    });

    test("Deve criar um pedido com cupom de desconto", function () {
        order.addItem(new Item(1, "XG", 'Franlda XG', 10), 1)
        order.addItem(new Item(2, "G", 'Franlda XG', 20), 1)
        order.addItem(new Item(3, "XG", 'Franlda XG', 30), 1)
        order.addCoupon(new Coupon("VALE20", 20))
        expect(order.getTotalOrderItems()).toBe(48);


    });

})