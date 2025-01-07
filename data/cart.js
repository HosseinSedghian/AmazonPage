export let cart = JSON.parse(localStorage.getItem('cart'));
if (!cart) {
    cart = [];
}

function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(cartId) {
    let matchingItem;
    cart.forEach((crt) => {
        if (crt.id === cartId) {
            matchingItem = crt;
        }
    });
    if (matchingItem) {
        matchingItem.quantity += 1;
    }
    else {
        cart.push({
            id: cartId,
            quantity: 1,
            deliveryOptionId: '1'
        });
    }
    saveToStorage();
}

export function removeFromCart(productId) {
    let newCart = [];
    cart.forEach((item) => {
        if (item.id !== productId) {
            newCart.push(item);
        }
    });
    cart = newCart;
    saveToStorage();
}

export function updateDeliveryOptions(productId, deliveryOptionId) {
    let matchingItem;
    cart.forEach((crt) => {
        if (crt.id === productId) {
            matchingItem = crt;
        }
    });
    matchingItem.deliveryOptionId = deliveryOptionId;
    saveToStorage();
}