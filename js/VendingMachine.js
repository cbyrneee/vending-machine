export class VendingMachine {
    _coins;
    _itemCount;

    constructor() {
        this._coins = 100;
        this._itemCount = 20;
    }

    purchaseItem(item) {
        if (this._itemCount < 0) throw "No more items available!";
        const price = item.getPrice();

        if (this._coins >= price) {
            this._coins -= price;
            this._itemCount -= 1;
        } else {
            throw "Not enough coins!";
        }
    }

    getItemCount() {
        return this._itemCount;
    }

    getCoins() {
        return this._coins;
    }

    addCoins(coins) {
        this._coins += coins;
    }
}
