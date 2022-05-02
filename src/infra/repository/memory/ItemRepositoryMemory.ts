import IItemRepository from "../../../domain/repository/IItemRepository";
import Item from "../../../domain/entity/Item";

export default class ItemRepositoryMemory implements IItemRepository {
    items: Item[];

    constructor() {
        this.items = [
            new Item(1, "Instrumentos Musicais", 'Guitarra', 1000),
            new Item(2, "Instrumentos Musicais", 'Amplificador', 5000),
            new Item(3, "Acessorios", 'Cabo', 30)
        ]
    }

    async findById(idItem: number): Promise<Item> {
        const itemData: any = this.items.find(item => item.idItem === idItem);
        if (!itemData) throw new Error("Item not found");
        const item = new Item(itemData.idItem, itemData.category, itemData.description, parseFloat(itemData.price));
        return item;
    }
}