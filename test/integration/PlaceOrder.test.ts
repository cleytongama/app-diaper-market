import DatabaseConnectionAdapter from '../../src/shared/infra/database/DatabaseConnectionAdapter';
import { FactoryRepositoryMemory } from '../../src/checkout/infra/factory/FactoryRepositoryMemory';
import { FactoryRepositoryDatabase } from '../../src/checkout/infra/factory/FactoryRepositoryDatabase';
import PlaceOrder from '../../src/checkout/application/usecase/PlaceOrder';
import { PlaceOrderDTO } from '../../src/checkout/application/dto/PlaceOrderDTO';
import EventBus from '../../src/shared/infra/event/EventBus';
import OrderPlacedStockHandler from '../../src/stock/domain/handler/OrderPlacedStockHandler';
import StockRepositoryDatabase from '../../src/stock/infra/repository/StockRepositoryDatabase';

let placeOrder: PlaceOrder;
const eventBus = new EventBus()

const makeRepositoryDatabase = () => {
    const connectDatabase = new DatabaseConnectionAdapter();
    const abstractFactory = new FactoryRepositoryDatabase(connectDatabase)
    const stockRepository = new StockRepositoryDatabase(connectDatabase)
    eventBus.subscribe("OrderPlaced", new OrderPlacedStockHandler(stockRepository))
    placeOrder = new PlaceOrder(abstractFactory, eventBus);
}

const makeRepositoryMemory = () => {
    const abstractFactory = new FactoryRepositoryMemory()
    placeOrder = new PlaceOrder(abstractFactory, eventBus);
}

describe("Caso de Uso:: Place Order", () => {
    beforeEach(() => {
        makeRepositoryDatabase()
        // makeRepositoryMemory()
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
