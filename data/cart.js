export const cart = [];
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
        quantity: 1
    });
}
}