import OrderCode from "../../src/checkout/domain/entity/OrderCode"

describe('Class Order Code', () => {
    test("Deve gerar um código do pedido", () => {
        const date = new Date()
        const sequence = 1
        const code = new OrderCode(date, sequence)
        expect(code.value).toBe("202200000001")
    })
})