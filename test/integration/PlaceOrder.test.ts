import OrderRepositoryMemory from '../../src/infra/repository/memory/OrderRepositoryMemory';
import ItemRepositoryMemory from '../../src/infra/repository/memory/ItemRepositoryMemory';
import PlaceOrder from '../../src/application/usecase/PlaceOrder';
import { PlaceOrderDTO } from '../../src/application/dto/PlaceOrderDTO';
import DatabaseConnectionAdapter from '../../src/infra/database/DatabaseConnectionAdapter';
import ItemRepositoryDatabase from '../../src/infra/repository/database/ItemRepositoryDatabase';
import OrderRepositoryDatabase from '../../src/infra/repository/database/OrderRepositoryDatabase';
import CouponRepositoryDatabase from '../../src/infra/repository/database/CouponRepositoryDatabase';

let placeOrder: PlaceOrder;

describe("Caso de Uso:: Place Order", () => {
    beforeEach(() => {
        const connectDatabase = new DatabaseConnectionAdapter()
        const itemRepository = new ItemRepositoryDatabase(connectDatabase)
        const orderRepository = new OrderRepositoryDatabase(connectDatabase)
        const couponRepository = new CouponRepositoryDatabase(connectDatabase);
        // const itemRepository = new ItemRepositoryMemory()
        // const orderRepository = new OrderRepositoryMemory()
        placeOrder = new PlaceOrder(itemRepository, orderRepository, couponRepository);
    })
    test("Deve fazer um pedido", async function () {
        const input = new PlaceOrderDTO.Input("00058484230", new Date(), [
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
        ], "VALE20")

        const output = await placeOrder.execute(input);
        expect(output.total).toBe(4872);
    });
})
