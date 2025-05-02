import { toHtmlElement } from "../toHtmlElement.mjs";

const PRODUCTS = [ // Imagine this data came in via the server
    {
        name: "Elder Chocolate Truffles, 2oz",
        description: "The best of the best in chocolate truffles.",
        imageSrc: "https://placehold.co/200x200",
        price: 10,
        numInCart: 2
    },
    {
        name: "Jelly Belly Jelly Beans, 100 count",
        description: "Not for planting.",
        imageSrc: "https://placehold.co/200x200",
        price: 5,
        numInCart: 1
    },
    {
        name: "Kettle Chips, 8oz",
        description: "Delicious and unhealthy.",
        imageSrc: "https://placehold.co/200x200",
        price: 3,
        numInCart: 0
    },
    {
        name: "Carrots, 2lb",
        description: "Delicious and healthy.",
        imageSrc: "https://placehold.co/200x200",
        price: 2,
        numInCart: 0
    }
];

/**
 * Turns a product data object into HTML.
 *
 * @param product product data
 * @return {HTMLElement} HTML element representing the product data
 */
function renderProductCard(product) {
    let htmlElement = toHtmlElement(
        `<article>
            <img src="${product.imageSrc}" alt="${product.name}" />
            <div class="product-details">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p class="price">$${product.price}</p>
                <div>
                    <button class="buy-button"> Add to cart </button>
                    <span class="num-in-cart"> ${product.numInCart > 0 ? `${ product.numInCart } in cart `: ""} </span>
                </div>
            </div>
        </article>
        `
    );

    let button = htmlElement.querySelector('.buy-button');
    button.addEventListener("click", () => {
        product.numInCart += 1;
        rerenderAllProducts();
        rerenderCart();
    });

    return htmlElement;
}


/**
 * Recreates all product cards.
 */
function rerenderAllProducts() {
    let productList = document.querySelector(".product-list");
    productList.innerHTML = "";

    const heading = document.createElement("h2");
    heading.textContent = "Search results";
    productList.appendChild(heading);

    for (let product of PRODUCTS) {
        if (shouldProductBeVisible(product)) {
            let productCard = renderProductCard(product);
            productList.appendChild(productCard);
        }
    }
}

rerenderAllProducts();

/**
 * Recreates all cart panel info.
 */
function rerenderCart() {
    let cartitems = document.querySelector(".cart-items");
    cartitems.innerHTML = "";

    for (let product of PRODUCTS) {
        if (product.numInCart > 0) {
            let p = document.createElement('p');
            p.innerHTML = `${product.name} x${product.numInCart}`;
            cartitems.append(p);

            let button = document.createElement('button');
            button.classList.add("remove-button");
            button.textContent = "Remove";
            cartitems.append(button);

            button.addEventListener("click", () => {
                product.numInCart -= 1;
                rerenderAllProducts();
                rerenderCart();
            });
        } 
    }
}

rerenderCart();

/**
 * Returns whether a product should be visible based on the current values of the price filters.
 *
 * @param product product data
 * @return {boolean} whether a product should be visible
 */
function shouldProductBeVisible(product) {
    const minPriceInput = document.querySelector("#minPrice");
    const maxPriceInput = document.querySelector("#maxPrice");  

    let minprice = minPriceInput.value === "" ? 0 : Number.parseFloat(minPriceInput.value);
    let maxprice = maxPriceInput.value === "" ? Infinity : Number.parseFloat(maxPriceInput.value);

    return product.price >= minprice && product.price <= maxprice;
}

const minPriceInput = document.querySelector("#minPrice");
const maxPriceInput = document.querySelector("#maxPrice");
minPriceInput.addEventListener('change', rerenderAllProducts);
maxPriceInput.addEventListener('change', rerenderAllProducts);
