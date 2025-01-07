import {cart, removeFromCart, updateDeliveryOptions} from '../../data/cart.js';
import {products} from '../../data/products.js';
import {formatCurrency} from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions} from '../../data/deliveryOptions.js';
import {renderPaymentSummary} from './paymentSummary.js';

export function updateOrderPage() {
  let finalHtml = '';
  cart.forEach((item) => {
    let matchingProduct;
    products.forEach((prd) => {
      if(prd.id === item.id) {
        matchingProduct = prd;
      }
    });
    const deliveryOptionId = item.deliveryOptionId;
    let deliveryOption;
    deliveryOptions.forEach((opt) => {
      if (opt.id === deliveryOptionId) {
        deliveryOption = opt;
      }
    });
    const today = dayjs();
    let deliveryDate = today.add(deliveryOption.deliveryDays, 'day');
    const dateString = deliveryDate.format("dddd, MMMM D");
    let html = `
    <div class="cart-item-container">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${item.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span data-item-id="${matchingProduct.id}" class="js-delete-quantity-link delete-quantity-link link-primary">
                    Delete
                  </span>
                </div>
              </div>
              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
              ${deliveryOptionsHTML(matchingProduct, item)}
              </div>
            </div>
          </div>
    `;
    finalHtml += html;
  });
  document.querySelector('.js-order-summary')
    .innerHTML = finalHtml;

  document.querySelectorAll('.js-delete-quantity-link')
  .forEach((deletebtn) => {
    deletebtn.addEventListener('click', () => {
      const cartId = deletebtn.dataset.itemId;
      removeFromCart(cartId);
      updateOrderPage();
    });
  });
  document.querySelectorAll('.js-delivery-option-input')
    .forEach((radioInput) => {
      radioInput.addEventListener('click', () => {
        updateDeliveryOptions(radioInput.dataset.productId, radioInput.dataset.deliveryoptionId);
        updateOrderPage();
      })
    });
    renderPaymentSummary();
}

export function updateCheckoutTitle () {
  if (cart) {
    document.querySelector('.js-return-to-home-link')
      .innerHTML = `${cart.length} items`;
  }
}

function deliveryOptionsHTML(matchingProduct, item) {
  let finalHtml = '';
  deliveryOptions.forEach((delOpt) => {
    const today = dayjs();
    let deliveryDate = today.add(delOpt.deliveryDays, 'day');
    const priceString = delOpt.priceCents === 0 ? "FREE" : `$${formatCurrency(delOpt.priceCents)} - `;
    const isChecked = item.deliveryOptionId === delOpt.id;
    finalHtml += `
    <div class="delivery-option">
      <input type="radio" 
        ${isChecked ? "checked" : ''}
        data-deliveryoption-id= ${delOpt.id}
        data-product-id = ${matchingProduct.id}
        class="delivery-option-input js-delivery-option-input"
        name="delivery-option-${matchingProduct.id}">
      <div>

        <div class="delivery-option-date">
          ${deliveryDate.format('dddd, MMMM D')}
        </div>

        <div class="delivery-option-price">
          ${priceString} Shipping
        </div>

      </div>
    </div>
  `;
  });
  return finalHtml;
}
