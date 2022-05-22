
import { SimulateFreightDTO } from '../../src/checkout/application/dto/SimulateFreightDTO';
import SimulateFreight from '../../src/checkout/application/usecase/SimulateFreight';
import Item from '../../src/checkout/domain/entity/Item';
import DatabaseConnectionAdapter from '../../src/shared/infra/database/DatabaseConnectionAdapter';
import ItemRepositoryDatabase from '../../src/checkout/infra/repository/database/ItemRepositoryDatabase';
import ItemRepositoryMemory from '../../src/checkout/infra/repository/memory/ItemRepositoryMemory';
import AbstractRepositoryFactory from '../../src/checkout/domain/factory/AbstractRepositoryFactory';
import { FactoryRepositoryDatabase } from '../../src/checkout/infra/factory/FactoryRepositoryDatabase';
import { FactoryRepositoryMemory } from '../../src/checkout/infra/factory/FactoryRepositoryMemory';
describe("UseCase: Simulate Freigth", () => {
    let simulateFreight: SimulateFreight
    beforeEach(() => {
        const databaseConnection = new DatabaseConnectionAdapter()
        const itemRepository = new ItemRepositoryDatabase(databaseConnection)
        // const itemRepository = new ItemRepositoryMemory()
        const abstractRepositoryFactory = new FactoryRepositoryDatabase(databaseConnection)
        // const abstractRepositoryFactory = new FactoryRepositoryMemory()
        simulateFreight = new SimulateFreight(abstractRepositoryFactory)
    })
    test("Deve simular o frete dos produtos", async () => {
        const input = new SimulateFreightDTO.Input([
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
        ])
        const freight = await simulateFreight.execute(input)
        expect(freight).toBe(280)
    })
})