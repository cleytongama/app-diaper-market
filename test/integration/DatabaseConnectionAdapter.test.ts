import DatabaseConnectionAdapter from '../../src/infra/database/DatabaseConnectionAdapter';

describe.only("Connection Database", () => {

    test("connect database", async () => {
        const databaseConnection = new DatabaseConnectionAdapter()
        const items = await databaseConnection.query("select * from diapers.items", [])
        expect(items.length >= 0).toBeTruthy();
    })
})