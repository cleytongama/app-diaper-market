import Item from "./Item";
import Order from "./Order";

export default class PlaceOrder {
    items: Item[]
    constructor(){
        this.items = [
            new Item(1, "XG", 'Franlda XG', 10), 
            new Item(2, "XG", 'Franlda XG', 10), 
            new Item(3, "XG", 'Franlda XG', 10)
        ]
    }

    async execute(input: any): Promise<any> {
        const order = new Order({cpf: input.cpf});
        for (const orderItem of input.orderItems) {
            const item = this.items.find(item=> item.idItem === orderItem.idItem);
            if(!item) throw new Error("Item not found")
            order.addItem(item, orderItem.quantity);
        }
        return {
            total: order.getTotalOrderItems()
        }
    }
}