
export namespace PlaceOrderDTO {
    export class Input {
        constructor(readonly cpf: string, readonly issueDate: Date, readonly orderItems: any[], readonly coupon?: string) { }
    }
    export class Output {
        constructor(readonly code: string, readonly total: number) { }
    }
}