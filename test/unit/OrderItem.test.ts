import OrderItem from "../../src/domain/entity/OrderItem";

describe('Class Order Item', () => {
    test("Deve criar um item de pedido", function () {
        const orderItem = new OrderItem({ code: 1, price: 1000, quantity: 2 });
        expect(orderItem.getTotal()).toBe(2000);
    });
});

