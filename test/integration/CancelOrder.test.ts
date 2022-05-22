import DatabaseConnectionAdapter from '../../src/shared/infra/database/DatabaseConnectionAdapter';
import { FactoryRepositoryMemory } from '../../src/checkout/infra/factory/FactoryRepositoryMemory';
import { FactoryRepositoryDatabase } from '../../src/checkout/infra/factory/FactoryRepositoryDatabase';
import PlaceOrder from '../../src/checkout/application/usecase/PlaceOrder';
import { PlaceOrderDTO } from '../../src/checkout/application/dto/PlaceOrderDTO';
import EventBus from '../../src/shared/infra/event/EventBus';
import OrderPlacedStockHandler from '../../src/stock/domain/handler/OrderPlacedStockHandler';
import StockRepositoryDatabase from '../../src/stock/infra/repository/StockRepositoryDatabase';
import CancelOrder from '../../src/checkout/application/usecase/CancelOrder';
import OrderCancelledStockHandler from '../../src/stock/domain/handler/OrderCancelledStockHandler';

let placeOrder: PlaceOrder;
const eventBus = new EventBus()
let cancelOrder: CancelOrder;

beforeEach(function () {
    const databaseConnection = new DatabaseConnectionAdapter();
    const databaseRepositoryFactory = new FactoryRepositoryDatabase(databaseConnection);
    const eventBus = new EventBus();
    eventBus.subscribe("OrderPlaced", new OrderPlacedStockHandler(new StockRepositoryDatabase(databaseConnection)));
    eventBus.subscribe("OrderCancelled", new OrderCancelledStockHandler(new StockRepositoryDatabase(databaseConnection)));
    placeOrder = new PlaceOrder(databaseRepositoryFactory, eventBus);
    cancelOrder = new CancelOrder(databaseRepositoryFactory, eventBus);
});

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
    await cancelOrder.execute(output.code);
});