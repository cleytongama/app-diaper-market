
export namespace PlaceOrderDTO {
    export class Input {
        constructor(readonly cpf: string, readonly orderItems: any[]) { }
    }

    export type Output = any
}