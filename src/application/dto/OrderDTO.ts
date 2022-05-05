export namespace OrderDTO {
    export class Output {
        constructor(readonly id: number, readonly code: string, readonly cpf: string, readonly freight: number, readonly total: number) {
        }
    }
}