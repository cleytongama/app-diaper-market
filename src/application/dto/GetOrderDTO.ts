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
        readonly freight: number,
        readonly total: number
    }

    export class Output {
        code: string;
        cpf: string;
        items: { description: string; quantity: number; price: number; }[];
        total: number;
        constructor({ code, cpf, items, total }: OutputType) {
            this.code = code;
            this.cpf = cpf;
            this.items = items;
            this.total = total;
        }
    }
}