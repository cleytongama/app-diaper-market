import Coupon from "../entity/Coupon";

export default interface ICouponRepository {
    findByCode(code: string): Promise<Coupon>;
}