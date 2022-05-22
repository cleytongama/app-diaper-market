export namespace GetOrderDTO {
    export class Input {
        constructor() { }
    }

    export type OutputType = {
        readonly code: string,
        readonly cpf: string,
        readonly items: {
            description: string,
            quantity: number,
            price: number
        }[],
        readonly total: number
    }

    export class Output {
        constructor({ code, cpf, items }: OutputType) { }
    }
}