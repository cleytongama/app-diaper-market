import ICouponRepository from '../../domain/repository/ICouponRepository';
import { ValidateCouponDTO } from '../dto/ValidateCouponDTO';



export default class ValidateCoupon {
    constructor(readonly couponRepository: ICouponRepository) { }

    async execute(input: ValidateCouponDTO.Input): Promise<boolean> {
        const coupon = await this.couponRepository.findByCode(input.coupon)
        const isValid = coupon.isValid(input.date);
        return isValid;
    }
}