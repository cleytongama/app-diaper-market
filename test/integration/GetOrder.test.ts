
import PlaceOrder from '../../src/application/usecase/PlaceOrder';
import DatabaseConnectionAdapter from '../../src/infra/database/DatabaseConnectionAdapter';
import DatabaseConnection from '../../src/infra/database/DatabaseConnection';
import OrderRepositoryDatabase from '../../src/infra/repository/database/OrderRepositoryDatabase';
import { PlaceOrderDTO } from '../../src/application/dto/PlaceOrderDTO';
import CouponRepositoryDatabase from '../../src/infra/repository/database/CouponRepositoryDatabase';
import ItemRepositoryDatabase from '../../src/infra/repository/database/ItemRepositoryDatabase';
import OrderDAODatabase from '../../src/infra/dao/OrderDAODatabase';
import GetOrder from '../../src/application/query/GetOrder';
import { FactoryRepositoryDatabase } from '../../src/infra/factory/FactoryRepositoryDatabase';
import { FactoryRepositoryMemory } from '../../src/infra/factory/FactoryRepositoryMemory';

let placeOrder: PlaceOrder;
let getOrder: GetOrder;

beforeEach(function () {

    const connectDatabase = new DatabaseConnectionAdapter();
    //>> Database
    // const abstractFactory = new FactoryRepositoryDatabase(connectDatabase)
    //>> Memory
    const abstractFactory = new FactoryRepositoryMemory();
    placeOrder = new PlaceOrder(abstractFactory);
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
