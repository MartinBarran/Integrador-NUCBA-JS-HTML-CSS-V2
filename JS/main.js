import { cartInit } from "./assets/cart.js";
import { cartToggleInit } from "./assets/cartToggle.js";
import { mobileMenuInit } from "./assets/mobileMenu.js"
import { renderProductsInit } from "./assets/renderProducts.js";




const init= () => {
    mobileMenuInit();
    cartToggleInit();
    renderProductsInit();
    cartInit();
};

init();