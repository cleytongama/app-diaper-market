import { PlaceOrderDTO } from '../../src/checkout/application/dto/PlaceOrderDTO';
import GetOrders from '../../src/checkout/application/query/GetOrders';
import PlaceOrder from '../../src/checkout/application/usecase/PlaceOrder';
import OrderDAODatabase from '../../src/checkout/infra/dao/OrderDAODatabase';
import DatabaseConnectionAdapter from '../../src/shared/infra/database/DatabaseConnectionAdapter';
import ItemRepositoryDatabase from '../../src/checkout/infra/repository/database/ItemRepositoryDatabase';
import OrderRepositoryDatabase from '../../src/checkout/infra/repository/database/OrderRepositoryDatabase';
import CouponRepositoryDatabase from '../../src/checkout/infra/repository/database/CouponRepositoryDatabase';
import { FactoryRepositoryDatabase } from '../../src/checkout/infra/factory/FactoryRepositoryDatabase';
import { FactoryRepositoryMemory } from '../../src/checkout/infra/factory/FactoryRepositoryMemory';
import EventBus from '../../src/shared/infra/event/EventBus';

let placeOrder: PlaceOrder;
let getOrders: GetOrders;
const eventBus = new EventBus()

beforeEach(function () {
    const connectDatabase = new DatabaseConnectionAdapter();
    //>> Database
    // const abstractFactory = new FactoryRepositoryDatabase(connectDatabase)
    //>> Memory
    const abstractFactory = new FactoryRepositoryMemory()
    placeOrder = new PlaceOrder(abstractFactory, eventBus);
    const orderDAO = new OrderDAODatabase(connectDatabase);
    getOrders = new GetOrders(orderDAO);
});

test("Deve obter um pedido pelo código", async function () {
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
    ], "VALE20");
    await placeOrder.execute(input);
    const getOrdersOutput = await getOrders.execute();
});