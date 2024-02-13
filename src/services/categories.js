import { categoryActive, setCategorieActive } from "../../main";
import { handleGetProductsLocalStorage } from "../persistence/localStorage";
import { handleRenderListItems } from "../views/store";

//=============CATEGORIAS===========
const handleFilterProductsByCategory = (categoryIn) => {
  const products = handleGetProductsLocalStorage();

  switch (categoryIn) {
    case categoryActive:
      handleRenderListItems(products);
      break;
    case "Hamburguesas":
    case "Papas":
    case "Gaseosas":
      const filteredResult = products.filter(
        (el) => el.categoria === categoryIn
      );
      handleRenderListItems(filteredResult);
      break;
    case "mayorPrecio":
      const sortedByHighestPrice = products.sort((a, b) => b.precio - a.precio);
      handleRenderListItems(sortedByHighestPrice);
      break;
    case "menorPrecio":
      const sortedByLowestPrice = products.sort((a, b) => a.precio - b.precio);
      handleRenderListItems(sortedByLowestPrice);
      break;
    default:
      handleRenderListItems(products);
      break;
  }
};

//render de la vista de las categorias
export const renderCategories = () => {
  const ulList = document.getElementById("listFilter");
  ulList.innerHTML = `
        <li id="Todo">Todos los productos</li>
        <li id="Hamburguesas">Hamburguesas</li>
        <li id="Papas">Papas</li>
        <li id="Gaseosas">Gaseosas</li>
        <li id="mayorPrecio">Mayor Precio</li>
        <li id="menorPrecio">Menor Precio</li>
  `;

  // Agregar manejadores de eventos a cada elemento li
  const liElements = ulList.querySelectorAll("li");
  liElements.forEach((liElement) => {
    liElement.addEventListener("click", () => {
      handleFilterProductsByCategory(liElement.id);
      liElements.forEach((el) => {
        if (el.classList.contains("liSelected")) {
          el.classList.remove("liSelected");
        } else {
          if (el === liElement) el.classList.add("liSelected");
        }
      });
    });
  });
};
