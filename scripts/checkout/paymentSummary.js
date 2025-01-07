import {cart} from '../../data/cart.js';
import {products} from '../../data/products.js';
import {formatCurrency} from '../utils/money.js';
import {deliveryOptions} from '../../data/deliveryOptions.js';

export function renderPaymentSummary() {
    let cartQuantity = 0;
    let totalPriceCent = 0;
    let totalDeliveryPrice = 0;
    cart.forEach((item) => {
        cartQuantity += item.quantity;
        let matchingProduct;
        let deliveryOption;
        products.forEach((prd) => {
            if(item.id === prd.id) {
                matchingProduct = prd;
            }
        });
        deliveryOptions.forEach((delOp) => {
            if (delOp.id === item.deliveryOptionId) {
                deliveryOption = delOp;
            }
        });
        totalDeliveryPrice += deliveryOption.priceCents;
        totalPriceCent += (matchingProduct.priceCents * item.quantity);
    });
    let totalPriceBeforeTax = totalPriceCent + totalDeliveryPrice;
    let totalTax = (10 * totalPriceBeforeTax) / 100;
    let totalFinalPrice = totalPriceBeforeTax + totalTax;
    let finalHTML = `
    <div class="payment-summary-title">
        Order Summary
    </div>

    <div class="payment-summary-row">
        <div>Items (${cartQuantity}):</div>
        <div class="payment-summary-money">$${formatCurrency(totalPriceCent)}</div>
    </div>

    <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${formatCurrency(totalDeliveryPrice)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${formatCurrency(totalPriceBeforeTax)}</div>
    </div>

    <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${formatCurrency(totalTax)}</div>
    </div>

    <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$${formatCurrency(totalFinalPrice)}</div>
    </div>

    <button class="place-order-button button-primary">
        Place your order
    </button>
    `;
    document.querySelector('.js-payment-summary')
        .innerHTML = finalHTML;
}