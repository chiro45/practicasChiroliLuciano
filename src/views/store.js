//=========STORE===================
import { setProductActive } from "../../main";
import {
  handleGetProductsLocalStorage,
  setProductsLocalStorage,
} from "../persistence/localStorage";
import { handleProductActive } from "../services/products";

//funcion que trae los datos de la bd
export const handleGetProductsToStore = () => {
  const product = handleGetProductsLocalStorage();
  if (product) {
    handleRenderListItems(product);
  } else {
    setProductsLocalStorage();
  }
};

//funcion que realiza el render de la lista
export const handleRenderListItems = (productsIn) => {
  const productosHTML = productsIn.map(
    (producto, index) => `
      <div class='cardContainer' id='product-${index}'>
         <div class='cardItem'>
          <img src="${producto.imagen}" alt="${producto.nombre}" />
          <div class='cardItem__description'>
          <div class=titleItem>
          <h2>${producto.nombre}</h2>
          </div>
           <div class='itemprop'>
          <p><b>Precio:</b> $${producto.precio}</p>
          <p><b>Categoría:</b> ${producto.categoria}</p>
          </div>
          </div>
          </div>
      </div>
    `
  );

  //tomamos el div de la store y seteamos los elementos de dentro
  const appContainer = document.getElementById("storeContainer");
  appContainer.innerHTML = productosHTML.join("");

  // Agregar un manejador de eventos a cada contenedor de producto
  productsIn.forEach((producto, index) => {
    const productContainer = document.getElementById(`product-${index}`);
    productContainer.addEventListener("click", () => {
      setProductActive(producto);
      handleProductActive(producto);
    });
  });
};
