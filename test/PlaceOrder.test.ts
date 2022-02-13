import PlaceOrder from "../src/PlaceOrder";

describe("Caso de Uso:: Place Order", ()=> {
    test("Deve fazer um pedido", async function () {
        const input = {
            cpf: "00058484230",
            orderItems: [
                {
                    idItem: 1,
                    quantity: 1
                },
                {
                    idItem: 2,
                    quantity: 1
                },
                {
                    idItem: 3,
                    quantity: 3
                }
            ]
        };
        const placeOrder = new PlaceOrder();
        const output = await placeOrder.execute(input);
        
        expect(output.total).toBe(50);
    });
})
