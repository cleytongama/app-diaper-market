export default class OrderCode {
    value: string

    constructor(date: Date, sequence: number) {
        if (!sequence || !(typeof sequence === "number")) throw new Error("Invalid parameter")
        const year = date.getFullYear();
        const sequenceChar = `${sequence}`.padStart(8, '0');
        this.value = `${year}${sequenceChar}`;
    }
}