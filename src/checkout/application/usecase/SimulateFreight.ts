import Item from "../../domain/entity/Item";
import IItemRepository from "../../domain/repository/IItemRepository";
import { SimulateFreightDTO } from "../dto/SimulateFreightDTO";
import FreightCalculator from '../../domain/service/FreightCalculator';
import AbstractRepositoryFactory from '../../domain/factory/AbstractRepositoryFactory';

export default class SimulateFreight {
    itemRepository: IItemRepository

    constructor(readonly abstractRepositoryFactory: AbstractRepositoryFactory) {
        this.itemRepository = abstractRepositoryFactory.itemRepository()
    }

    async execute(input: SimulateFreightDTO.Input): Promise<number> {
        let freight = 0
        for (const itemInput of input.items) {
            const item: Item = await this.itemRepository.findById(itemInput.idItem)
            freight += FreightCalculator.calculate(item) * itemInput.quantity;
        }
        return freight
    }
} 