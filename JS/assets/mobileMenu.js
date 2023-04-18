const mobileMenu = document.getElementById("mobile-menu");
const closeIcon = document.querySelector(".close-icon");
const menuIcon = document.querySelector(".menu-icon");
const menuItem = document.querySelectorAll(".nav-menu-item");

const toggle = () => mobileMenu.classList.toggle("not-visible")

const slowToggle = () =>{
    setTimeout(() => {
    toggle();
  }, 700);
}
//FC QUE AGREGA EVENT LISTENER A TODOS LOS ITEMS DEL MENU. AL CLICARLOS, CIERRA MENÚ. 
const addEventListenerToMenuItem = () => {
    menuItem.forEach(item => {
    item.addEventListener("click", slowToggle);
  });
  }

export const mobileMenuInit = () => {
    closeIcon.addEventListener('click', toggle);
    menuIcon.addEventListener('click', toggle);
    addEventListenerToMenuItem();
}