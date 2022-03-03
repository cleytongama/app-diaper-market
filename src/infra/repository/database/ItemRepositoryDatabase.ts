import Item from '../../../domain/entity/Item';
import ItemRepository from '../../../domain/repository/IItemRepository';
import DatabaseConnection from '../../database/DatabaseConnection';
export default class ItemRepositoryDatabase implements ItemRepository {

    constructor(readonly databaseConnection: DatabaseConnection) { }

    async findById(idItem: number): Promise<Item> {
        const [itemData] = await this.databaseConnection.query("select * from diapers.items where id = $1", [idItem]);
        if (!itemData) {
            throw new Error('Item not found')
        }
        const item = new Item(itemData.id, itemData.category, itemData.description, parseFloat(itemData.price));
        return item;
    }
}