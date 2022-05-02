import Item from "../../domain/entity/Item";
import IItemRepository from "../../domain/repository/IItemRepository";
import { SimulateFreightDTO } from "../dto/SimulateFreightDTO";

export default class SimulateFreight {
    constructor(readonly itemRepository: IItemRepository) { }

    async execute(input: SimulateFreightDTO.Input): Promise<number> {
        let freight = 0
        for (const itemInput of input.items) {
            const item: Item = await this.itemRepository.findById(itemInput.idItem)
            freight += item.getFreight() * itemInput.quantity;
        }
        return freight
    }
} 