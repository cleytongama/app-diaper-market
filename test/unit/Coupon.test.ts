import Coupon from '../../src/domain/entity/Coupon';

describe('Class Coupon', () => {

    test("Deve aplicar cupom de desconto válido", function () {
        const coupon = new Coupon("VALE30", 30, new Date("2022-02-13"))
        const isExpired = coupon.isExpired(new Date("2022-02-01"))
        expect(isExpired).toBeFalsy();
    });

    test("Deve aplicar cupom de desconto expirado", function () {
        const coupon = new Coupon("VALE30", 30, new Date("2022-01-02"))
        const isExpired = coupon.isExpired(new Date("2022-02-13"))
        expect(isExpired).toBeTruthy();
    });

    test("Deve aplicar cupom de desconto que não expira", function () {
        const coupon = new Coupon("VALE30", 30)
        const isExpired = coupon.isExpired(new Date("2022-02-13"))
        expect(isExpired).toBeFalsy();
    });


})