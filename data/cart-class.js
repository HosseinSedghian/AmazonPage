export class Cart {
    cartItems;
    #localstoragekey;

    constructor(locstoragekey) {
         this.#localstoragekey = locstoragekey;
         this.cartItems = JSON.parse(localStorage.getItem(this.#localstoragekey));
         if (!this.cartItems) {
            this.cartItems = [];
         }
    }

    saveToStorage() {
        localStorage.setItem(this.#localstoragekey, JSON.stringify(this.cartItems));
    }

    addToCart(productId) {
        let matchingItem;
        this.cartItems.forEach((crt) => {
            if (crt.id === productId) {
                matchingItem = crt;
            }
        });
        if (matchingItem) {
            matchingItem.quantity += 1;
        }
        else {
            this.cartItems.push({
                id: productId,
                quantity: 1,
                deliveryOptionId: '1'
            });
        }
        this.saveToStorage();
    }

    removeFromCart(productId) {
        let newCart = [];
        this.cartItems.forEach((item) => {
            if (item.id !== productId) {
                newCart.push(item);
            }
        });
        this.cartItems = newCart;
        this.saveToStorage();
    }

    updateDeliveryOptions(productId, deliveryOptionId) {
        let matchingItem;
        this.cartItems.forEach((crt) => {
            if (crt.id === productId) {
                matchingItem = crt;
            }
        });
        matchingItem.deliveryOptionId = deliveryOptionId;
        this.saveToStorage();
    }
}