import OrderRepositoryMemory from '../../src/infra/repository/memory/OrderRepositoryMemory';
import ItemRepositoryMemory from '../../src/infra/repository/memory/ItemRepositoryMemory';
import PlaceOrder from '../../src/application/usecase/PlaceOrder';
import { PlaceOrderDTO } from '../../src/application/dto/PlaceOrderDTO';
import DatabaseConnectionAdapter from '../../src/infra/database/DatabaseConnectionAdapter';
import ItemRepositoryDatabase from '../../src/infra/repository/database/ItemRepositoryDatabase';
import OrderRepositoryDatabase from '../../src/infra/repository/database/OrderRepositoryDatabase';
import CouponRepositoryDatabase from '../../src/infra/repository/database/CouponRepositoryDatabase';
import CouponRepositoryMemory from '../../src/infra/repository/memory/CouponRepositoryMemory';
import { FactoryRepositoryMemory } from '../../src/infra/factory/FactoryRepositoryMemory';
import { FactoryRepositoryDatabase } from '../../src/infra/factory/FactoryRepositoryDatabase';

let placeOrder: PlaceOrder;

const makeRepositoryDatabase = () => {
    const connectDatabase = new DatabaseConnectionAdapter();
    const abstractFactory = new FactoryRepositoryDatabase(connectDatabase)
    placeOrder = new PlaceOrder(abstractFactory);
}

const makeRepositoryMemory = () => {
    const abstractFactory = new FactoryRepositoryMemory()
    placeOrder = new PlaceOrder(abstractFactory);
}

describe("Caso de Uso:: Place Order", () => {
    beforeEach(() => {
        // makeRepositoryDatabase()
        makeRepositoryMemory()
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
