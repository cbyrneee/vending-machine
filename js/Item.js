export class Item {
    _price;

    constructor(price) {
        this._price = price;
    }

    getPrice() {
        return this._price;
    }
}
