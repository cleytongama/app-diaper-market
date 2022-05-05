import CouponRepositoryDatabase from '../../src/infra/repository/database/CouponRepositoryDatabase';
import DatabaseConnectionAdapter from '../../src/infra/database/DatabaseConnectionAdapter';
import ValidateCoupon from '../../src/application/usecase/ValidateCoupon';
describe("Validate coupon", () => {
    test("Deve validar um cupom de desconto", async () => {
        const databaseConnectionAdapter = new DatabaseConnectionAdapter()
        const couponRepositoryDatabase = new CouponRepositoryDatabase(databaseConnectionAdapter)
        const validateCoupon = new ValidateCoupon(couponRepositoryDatabase)
        const input = {
            coupon: "VALE20",
            date: new Date("2022-01-10")
        }
        const isValidCoupon = await validateCoupon.execute(input)
        expect(isValidCoupon).toBeTruthy()
    })
})