import { PlaceOrderDTO } from '../../src/application/dto/PlaceOrderDTO';
import GetOrders from '../../src/application/query/GetOrders';
import PlaceOrder from '../../src/application/usecase/PlaceOrder';
import OrderDAODatabase from '../../src/infra/dao/OrderDAODatabase';
import DatabaseConnectionAdapter from '../../src/infra/database/DatabaseConnectionAdapter';
import ItemRepositoryDatabase from '../../src/infra/repository/database/ItemRepositoryDatabase';
import OrderRepositoryDatabase from '../../src/infra/repository/database/OrderRepositoryDatabase';
import CouponRepositoryDatabase from '../../src/infra/repository/database/CouponRepositoryDatabase';
import { FactoryRepositoryDatabase } from '../../src/infra/factory/FactoryRepositoryDatabase';
import { FactoryRepositoryMemory } from '../../src/infra/factory/FactoryRepositoryMemory';

let placeOrder: PlaceOrder;
let getOrders: GetOrders;

beforeEach(function () {
    const connectDatabase = new DatabaseConnectionAdapter();
    //>> Database
    // const abstractFactory = new FactoryRepositoryDatabase(connectDatabase)
    //>> Memory
    const abstractFactory = new FactoryRepositoryMemory()
    placeOrder = new PlaceOrder(abstractFactory);
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