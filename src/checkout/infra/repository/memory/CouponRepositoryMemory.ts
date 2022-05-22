import Coupon from "../../../domain/entity/Coupon";
import ICouponRepository from "../../../domain/repository/ICouponRepository";

export default class CouponRepositoryMemory implements ICouponRepository {

    coupons: Array<any>;

    constructor() {
        this.coupons = [{
            code: "VALE20",
            percentage: 20,
            expire_date: new Date("2023-01-10"),
        }]
    }

    async findByCode(code: string): Promise<Coupon> {
        const couponData = this.coupons.find((coupon) => coupon.code === code);
        if (!couponData) throw new Error("Coupon not found");
        const coupon = new Coupon(couponData.code, couponData.percentage, couponData.expire_date);
        return coupon;
    }
}