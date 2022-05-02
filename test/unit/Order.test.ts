import Coupon from '../../src/domain/entity/Coupon';
import Item from '../../src/domain/entity/Item';
import Order from '../../src/domain/entity/Order';

let order: Order;

beforeEach(() => {
    order = new Order({ cpf: "000.584.842-30", issueDate: new Date(), sequence: 1 });
})

describe('Class Order', () => {

    test("Deve informar um cpf válido", function () { })

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
        order.addItem(new Item(1, "XG", 'Franlda XG', 10, 1000, 100, 30, 10), 1)
        order.addItem(new Item(2, "G", 'Franlda XG', 20), 1)
        order.addItem(new Item(3, "XG", 'Franlda XG', 30), 1)
        order.addCoupon(new Coupon("VALE20", 20))
        expect(order.getTotalOrderItems()).toBe(48);
    });

    test("Deve calcular o frete de 3 itens", function () {
        order.addItem(new Item(1, "Instrumentos Musicais", "Guitarra", 1000, 100, 30, 10, 3), 1);
        order.addItem(new Item(2, "Instrumentos Musicais", "Amplificador", 5000, 100, 50, 50, 20), 1);
        order.addItem(new Item(3, "Instrumentos Musicais", "Cabo", 30, 10, 10, 10, 0.9), 3);
        const freight = order.getFreight();
        expect(freight).toBe(260);
    });
    test("Deve criar um pedido com código gerado", function () {
        order.addItem(new Item(1, "Instrumentos Musicais", "Guitarra", 1000, 100, 30, 10, 3), 1);
        order.addItem(new Item(2, "Instrumentos Musicais", "Amplificador", 5000, 100, 50, 50, 20), 1);
        order.addItem(new Item(3, "Instrumentos Musicais", "Cabo", 30, 10, 10, 10, 0.9), 3);
        const code = order.code;
        expect(code.value).toBe("202200000001");
    });

})