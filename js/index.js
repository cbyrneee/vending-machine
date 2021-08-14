import { Item } from "./Item.js";
import { VendingMachine } from "./VendingMachine.js";

const machine = new VendingMachine();
var previousResultTimeout;

function updateCoinsCount() {
    showText("Coins: " + machine.getCoins());
}

function addMoreCoins() {
    machine.addCoins(50);
    updateCoinsCount();
}

function showText(text) {
    const element = document.getElementById("text");
    element.innerText = text;
}

function setPickupBoxVisible(isVisible) {
    const element = document.getElementById("pickupBox");
    element.style.display = isVisible ? "block" : "none";
}

function onItemClicked(event) {
    const button = event.target;

    try {
        const item = new Item(button.coins);
        machine.purchaseItem(item);
        console.log(button);

        clearTimeout(previousResultTimeout);
        previousResultTimeout = setTimeout(() => {
            setPickupBoxVisible(false);
            previousResultTimeout = null;
        }, 3000);

        button.disabled = true;
        button.style =
            "height: 50px; filter: hue-rotate(" +
            button.hue +
            "deg); opacity: 0.25;";

        console.log(button.style);

        updateCoinsCount();
        setPickupBoxVisible(true);
    } catch (error) {
        showText(error);
        setTimeout(() => {
            updateCoinsCount();
        }, 1500);
    }
}

function init() {
    updateCoinsCount();
    setPickupBoxVisible(false);

    const content = document.getElementById("content");
    for (var i = 0; i < machine.getItemCount(); i++) {
        const button = document.createElement("button");
        const cost = Math.floor(Math.random() * 20) + 2;

        button.className = "item";
        button.onclick = onItemClicked;
        button.coins = cost;
        button.title = cost + " coins";

        const image = document.createElement("img");
        image.src = "./img/soda.png";
        image.hue = Math.random() * 360;
        image.style = "height: 50px; filter: hue-rotate(" + image.hue + "deg);";
        image.coins = cost;
        image.title = cost + " coins";

        button.appendChild(image);
        content.appendChild(button);
    }

    const pickupBox = document.getElementById("pickupBox");
    pickupBox.onclick = () => {
        previousResultTimeout = null;
        setPickupBoxVisible(false);
    };

    const addMoreCoinsButton = document.getElementById("addMoreCoins");
    addMoreCoinsButton.onclick = addMoreCoins;
}

init();
