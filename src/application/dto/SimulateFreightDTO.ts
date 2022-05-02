export namespace SimulateFreightDTO {
    type inputModel = {
        idItem: number,
        quantity: number
    }
    export class Input {
        constructor(readonly items: Array<inputModel>) { }
    }
    export class Output {
        constructor() {

        }
    }
}