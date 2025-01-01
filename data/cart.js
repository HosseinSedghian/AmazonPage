export let cart = JSON.parse(localStorage.getItem('cart'));
if (!cart) {
    cart = [];
}
/*
[{
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2
}, {
    id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 3
},{
    id: "3ebe75dc-64d2-4137-8860-1f5a963e534b",
    quantity: 3
}];
*/

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
