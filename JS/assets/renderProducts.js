const productsContainer = document.querySelector(".prod-container");
import { productsData } from "./productsArray.js";
const todos = document.getElementById("todos");
const checkboxes = document.querySelectorAll("input[type='checkbox']");
const seeMoreBtn = document.getElementById("see-more");
let shownProductsQuantity = 6;


//function showMoreProducts() {
//  shownProductsQuantity += 6;
//  renderProducts(shownProductsQuantity);
//  if(shownProductsQuantity >= productsData.length){
//    seeMoreBtn.classList.add("not-visible");
//  }
//
//}



//FC QUE AGREGA EVENT LISTENER A TODOS LOS BOTONES DE FILTRO Y, AL ESCUCHAR UN CLIC, EJECUTA FC filterProducts
const addEventListenerToCheckBoxes = () => {
  checkboxes.forEach(checkbox => {
  checkbox.addEventListener("click", filterProducts);
});
}

//Fc que garantiza que, cuando esté activa el filtro TODOS, el resto se desactive.
 const onlyTodosChecked = () =>{
  todos.checked = true;
  checkboxes.forEach(checkbox => {
    if(checkbox.id != "todos"){
      checkbox.checked = false;
    }})
 }

//FC QUE AcTUALIZA ESTADO DE LOS BOTONES: SI "TODOS"=ACTIVO, EL RESTO INACTIVO. SI ALGUNO DEL RESTO ESTÁ ACTIVO, TODOS=INACTIVO-
const updateFilterCheckboxes = (e) =>{
  const checkboxes = document.querySelectorAll("input[type='checkbox']:checked");
  if(e.target.id === "todos"){
    onlyTodosChecked();
  }else if(checkboxes.length < 1){
    todos.checked = true;
  }else if(checkboxes.length > 1 & todos.checked == true){
    todos.checked = false;
  }else if(checkboxes.length == 4){
    onlyTodosChecked();
  }  
}

//FC QUE CREA NUEVO ARRAY DE PRODUCTOS FILTRADOS Y EJECUTA FC PARA RENDERIZAR. ANTES, ACTUALIZA ESTADO DE LOS BOTONES
function filterProducts(e) {
  updateFilterCheckboxes(e);
  const filteredProducts = [];
  const checkboxes = document.querySelectorAll("input[type='checkbox']:checked");

  checkboxes.forEach(checkbox => {
    const filterValue = checkbox.value;

    productsData.forEach(product => {
      if (product.ageRange === filterValue) {
        filteredProducts.push(product);
      }
    });
  });
  if(filteredProducts.length>0){
    renderProducts(filteredProducts);
  }else{
    renderProducts(productsData)
  }
}


const renderProducts = (arr) =>{
  //const shownProducts = productsData.slice(0, productsQuantity)  
  const html = arr.map(obj => {
        return `
          <div class="col">
            <div class="card" style="width: 15rem;">
              <img src="./img/portadas fake/1.png" class="card-img-top" alt="...">
              <div class="card-body">
                <h6>${obj.category}</h6>
                <h4 class="card-title">${obj.name}</h4>
                <h7>${obj.type}</h7>
                <p class="card-text">$${obj.cost}</p>
                <button type="button" id="add-cart-btn" class="boton" 
                data-id='${obj.id}'
                data-name='${obj.name}'
                data-cost='${obj.cost}'
                data-type='${obj.type}'
                data-img='${obj.cardImg}'
                data-quantity='${obj.quantity}'
                >Agregar al carrito</button>
              </div>
            </div>
          </div>
        `;
      }).join("");
    
      productsContainer.innerHTML = html;
}

export const renderProductsInit = () =>{
  renderProducts(productsData);
  addEventListenerToCheckBoxes();  
  //seeMoreBtn.addEventListener("click", showMoreProducts);
}