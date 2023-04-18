import { toggle } from "./cartToggle.js";
const cartTxt = document.querySelector(".cart-text");
const cartBubble = document.querySelector(".cart-bubble");
const cartBtn = document.querySelector(".cart-btn");
const glassmorphism = document.getElementById("glassmorphism");
const seeProductsBtn = document.querySelector(".boton-productos");


// FUNCIÓN FLECHA QUE ALMACENA EN LOCAL STORAGE UN ARRAY DE OBJETOS (PARA CARRITO)
let saveLocalStorage = (cartList) => {
    localStorage.setItem("cart", JSON.stringify(cartList));
  };
  
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// CONSTRUCTOR DE PRODUCTOS
const productConstructor = (id, name, cost, type, img, quantity) => {
    return { id, name, cost, type, img, quantity };
  };

  //fC QUE CORROBORA SI UN PRODUCTO DADO HA SIDO AGREGADO CON ANTERIORIDAD
const isAlreadyAdded = (prod) =>{
    return cart.some(e => e.id === prod.id);    
}

//FC QUE AGREGA 1 UNIDAD AL ATRIBUTO QUANTITY DE UN PRODUCTO DETERMINADO
  const addOneUnit = (prod) =>{
    cart.map(function(arrObj){
        if(arrObj.id === prod.id){
        arrObj.quantity += 1;
        }
      });
  }

  //FUNCIÓN QUE CREA PRODUCTO(objeto) EN EL CART(array) del LS Y CREA PROPIEDAD "quantity" con valor 1.
  const createCartProduct = (product) => {
    cart = [...cart, { ...product, quantity: 1 }];
  };

  //FC QUE CORROBORA SI EL CARRITO ESTÁ VACÍO
  const cartIsEmpty = () => {
    return !cart.length;
  }

  //FC QUE RENDERIZA EN CASO DE CARRITO VACÍO
  const renderEmptyCart = () => {
    cartTxt.innerHTML = `<h2>Carrito (0)</h2> 
    <p>No hay productos en el carrito.</p>`;
    cartBtn.innerHTML = `<button type="button" class="boton-productos" href=""><a id="btn-prod" class="boton-enlace" href="#productos">Ver productos</a></button>`
    bubbleNumber();
  }
  //FC QUE RENDERIZA EL PRODUCTO EN EL CARRITO
  const renderCartProduct = (product) => {
    const { name, id, type, cost, img, quantity } = product;
    return   `<div class="added-product-card">
    <img src="${img}" class="added-img" alt="...">
    <div class="added-card-body">
      <div class="added-container1">
      <h4 class="added-card-title">${name}</h4>
      <div><i id="trash-icon" data-id='${id}' class="fa-regular fa-trash-can cart-container-icon"></i></div>
      </div>
      <div class="added-container1">
      <div>
      <h7>${type}</h7>
      <p class="card-text">$${cost}*${quantity}= $${cost*quantity}</p>
      </div>
      <div class="cart-item-count">
      <i id="minusIcon" class="fa-regular fa-square-minus cart-container-icon" data-id='${id}'></i>
      <h4 id="quantity-txt">${quantity}</h4>
      <i id="plusIcon" class="fa-regular fa-square-plus cart-container-icon" data-id='${id}'></i>
      </div>
      </div>
    </div>
  </div>`;
  }

  //FC QUE RENDERIZA BURBUJA
  const bubbleNumber = () =>{
    let count = countAddedProducts();
    cartBubble.innerHTML  = `${count}`;
  }

  //FC QUE SUMA EL COSTO TOTAL. SI ES MAYOR A 0, RENDERIZA
  const displayTotal = () =>{
    let count = 0;
    cart.forEach(obj =>{
        count += obj.cost * obj.quantity;
    });
    if (count>0){
        cartBtn.innerHTML = `<h2>Total = $${count}</h2>
        <button type="button" class="boton-productos" href="./productos"><a class="boton-enlace boton-productos" href="./">COMPRAR</a></button>`;
            }else{
                cartBtn.innerHTML = ``;
            }
    };
//FC QUE CONTABILIZA LA CANTIDAD TOTAL DE PRODUCTOS AGREGADOS Y DEVUELVE ESE VALOR.
    const countAddedProducts = () =>{
        let count = 0;
        cart.map(function(obj){
          count = count + obj.quantity;
        })
        return count;
    }

    //FC PARA RENDERIZAR CARRITO. SI ESTÁ VACÍO, ENTONCES RENDERIZA renderEmptyCart().
    //CASO CONTRARIO, RENDERIZA LA CANTIDAD TOTAL DE PRODUCTOS, CADA PRODUCTO INDIVIDUAL, LA BUBBLE Y EL $ TOTAL.
  const renderCart = () => {
    if(cartIsEmpty()){
        renderEmptyCart()
    }else{
    let count = countAddedProducts();  
    cartTxt.innerHTML = `<h2>Carrito (${count})</h2>` + cart.map(renderCartProduct).join("");
    bubbleNumber(); 
    displayTotal();
    }
  };

//FUNCIÓN QUE RECIBE AL EVENTO ESCUCHADO. SI ES UN BOTÓN ADD, DESESTRUCTURA EL DATASET DE DICHO BOTÓN,
// CREA UN OBJETO PRODUCTO CON DICHA DATA Y ACTIVA EVENTO TOGGLE. SI ESE PRODUCTO HABÍA SIDO YA AGREGADO AL CART,
// AGREGA UNA UNIDAD. EN CASO CONTRARIO, CREA EL PRODUCTO EN EL ARRAY CART.
//SALVA EL ARRAY CART EN LOCAL STORAGE. RENDERIZA EN EL CARRITO.
const addToCart = (e) =>{
    if (e.target.id == "add-cart-btn"){
        const { id, name, cost, type, img } = e.target.dataset;
        let product = productConstructor(id, name, cost, type, img);
        toggle();
        
        if (isAlreadyAdded(product)) {
        addOneUnit(product);                   
        }else{
            createCartProduct(product) ;                           
        }   
        saveLocalStorage(cart);
        renderCart(cart);  
    }
}


//FUNCIÓN PARA AGREGAR UNA UNIDAD AL ATRIBUTO QUANTITY DEL OBJETO RECIBIDO
function addUnit(e){
  const { id } = e.target.dataset;
  let receivedId = productConstructor(id);
  const result = cart.find(({ id }) => id === receivedId.id);
  result.quantity+=1;
    }
//FUNCIÓN PARA RESTAR UNA UNIDAD AL ATRIBUTO QUANTITY DEL OBJETO RECIBIDO. En caso de que quantity tenga un valor
//menor a 1, el objeto se elimina del array cart.
function substractUnit(e){
if (e.target.id == "minusIcon"){
  const { id } = e.target.dataset;
  let receivedId = productConstructor(id);
  const result = cart.find(({ id }) => id === receivedId.id);
  result.quantity-=1;
  if(result.quantity<1){
    cart = cart.filter(cartProduct => cartProduct.id != result.id);
  }
    }}
//FC QUE ANALIZA QUÉ BOTÓN (+ O -) SE TOCÓ
export function cartUnits(e){
  if (e.target.id == "plusIcon"){
    addUnit(e);
  }else if(e.target.id == "minusIcon"){
    substractUnit(e)
  }
  saveLocalStorage(cart);
  renderCart(cart);
}

//FUNCIÓN PARA ELIMINAR PRODUCTO DE CARRITO DE COMPRA Y DE LS
//Como el trash-icon es creado de manera dinámica, no podemos attachearle directamente un addEventList. 
//Se lo attacheamos al body, y activamos la función sólo en caso de que se trate del icono trash-
function deleteCartProduct (event) {
  if( event.target.id == 'trash-icon'){   
    const { id } = event.target.dataset;
    const deletedProduct = productConstructor(id);
    cart = cart.filter(cartProduct => cartProduct.id != deletedProduct.id); 
    saveLocalStorage(cart);
    renderCart(cart); 
  };
} 

//Fc QUE CIERRA CARRITO AL TOCAR FUERA DE ÉL, O EN EL BOTÓN PARA VER MÁS PRODUCTOS
const closeCart = (event) =>{
  if(event.target.id === 'glassmorphism' || event.target.id === 'btn-prod' ){
    toggle()
  }
}


export const cartInit = () =>{
    document.body.addEventListener("click", addToCart);
    document.body.addEventListener("click", cartUnits);
    document.body.addEventListener( 'click', deleteCartProduct);
    document.body.addEventListener("click", closeCart);
    bubbleNumber();
    renderCart();
}