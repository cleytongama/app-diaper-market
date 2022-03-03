import IItemRepository from "../../../domain/repository/IItemRepository";
import Item from "../../../domain/entity/Item";

export default class ItemRepositoryMemory implements IItemRepository {
    items: Item[];

    constructor() {
        this.items = [
            new Item(1, "XG", 'Franlda XG', 10),
            new Item(2, "XG", 'Franlda XG', 10),
            new Item(3, "XG", 'Franlda XG', 10)
        ]
    }

    async findById(idItem: number): Promise<Item> {
        const item = this.items.find(item => item.idItem === idItem);
        if (!item) throw new Error("Item not found");
        return item;
    }
}