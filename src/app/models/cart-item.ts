export class CartItem{
    constructor(
        public id: string,
        public product: string,
        public quantity: string,
        public price: number,
        public image: string
    ){}
}