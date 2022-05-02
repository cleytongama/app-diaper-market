import DatabaseConnection from "../../database/DatabaseConnection";
import Coupon from "../../../domain/entity/Coupon";
import ICouponRepository from "../../../domain/repository/ICouponRepository";

export default class CouponRepositoryDatabase implements ICouponRepository {

    constructor(readonly databaseConnection: DatabaseConnection) {
    }

    async findByCode(code: string): Promise<Coupon> {
        const [couponData] = await this.databaseConnection.query("select * from diapers.coupons where code = $1", [code]);
        if (!couponData) throw new Error("Coupon not found");
        const coupon = new Coupon(couponData.code, couponData.percentage, couponData.expire_date);
        return coupon;
    }
}