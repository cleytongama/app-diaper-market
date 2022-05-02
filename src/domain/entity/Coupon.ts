export default class Coupon {
    constructor(readonly code: string, readonly percentage: number, readonly expirationDate?: Date) { }

    isExpired(today: Date = new Date()) {
        if (!this.expirationDate) return false
        return this.expirationDate.getTime() < today.getTime()
    }

    isValid(today: Date = new Date()) {
        console.log(today)
        return !this.isExpired(today);
    }
}