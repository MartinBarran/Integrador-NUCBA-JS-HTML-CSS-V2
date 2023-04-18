const cartMenu = document.getElementById("cart-menu");
const cartIcon = document.querySelector(".cart-icon");
const glassmorphism = document.getElementById("glassmorphism");

export const toggle = () => {
    cartMenu.classList.toggle("not-visible");
    glassmorphism.classList.toggle("display-glassmorphism")

}

export const cartToggleInit = () => {
    cartIcon.addEventListener('click', toggle);
}
