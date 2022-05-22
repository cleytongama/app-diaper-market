
import PlaceOrder from '../../src/checkout/application/usecase/PlaceOrder';
import OrderRepositoryDatabase from '../../src/checkout/infra/repository/database/OrderRepositoryDatabase';
import { PlaceOrderDTO } from '../../src/checkout/application/dto/PlaceOrderDTO';
import CouponRepositoryDatabase from '../../src/checkout/infra/repository/database/CouponRepositoryDatabase';
import ItemRepositoryDatabase from '../../src/checkout/infra/repository/database/ItemRepositoryDatabase';
import OrderDAODatabase from '../../src/checkout/infra/dao/OrderDAODatabase';
import GetOrder from '../../src/checkout/application/query/GetOrder';
import { FactoryRepositoryDatabase } from '../../src/checkout/infra/factory/FactoryRepositoryDatabase';
import { FactoryRepositoryMemory } from '../../src/checkout/infra/factory/FactoryRepositoryMemory';
import DatabaseConnectionAdapter from '../../src/shared/infra/database/DatabaseConnectionAdapter';
import EventBus from '../../src/shared/infra/event/EventBus';

let placeOrder: PlaceOrder;
let getOrder: GetOrder;
const eventBus = new EventBus()
beforeEach(function () {

    const connectDatabase = new DatabaseConnectionAdapter();
    //>> Database
    // const abstractFactory = new FactoryRepositoryDatabase(connectDatabase)
    //>> Memory
    const abstractFactory = new FactoryRepositoryMemory();
    placeOrder = new PlaceOrder(abstractFactory, eventBus);
    //TODO: Criar um dao em memoria..
    const orderDAO = new OrderDAODatabase(connectDatabase);
    getOrder = new GetOrder(orderDAO);

});

test.only("Deve obter um pedido pelo código", async function () {
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
    await placeOrder.execute(input);
    const getOrderOutput = await getOrder.execute("202200000029");//Pegando esse código do banco
    expect(getOrderOutput.total).toBe(4872);
});
