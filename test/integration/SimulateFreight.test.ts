
import { SimulateFreightDTO } from '../../src/application/dto/SimulateFreightDTO';
import SimulateFreight from '../../src/application/usecase/SimulateFreight';
import Item from '../../src/domain/entity/Item';
import DatabaseConnectionAdapter from '../../src/infra/database/DatabaseConnectionAdapter';
import ItemRepositoryDatabase from '../../src/infra/repository/database/ItemRepositoryDatabase';
import ItemRepositoryMemory from '../../src/infra/repository/memory/ItemRepositoryMemory';
describe("UseCase: Simulate Freigth", () => {
    let simulateFreight: SimulateFreight
    beforeEach(() => {
        const databaseConnection = new DatabaseConnectionAdapter()
        const itemRepository = new ItemRepositoryDatabase(databaseConnection)
        // const itemRepository = new ItemRepositoryMemory()
        simulateFreight = new SimulateFreight(itemRepository)
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