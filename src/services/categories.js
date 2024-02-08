import { categoryActive, setCategorieActive } from "../../main";
import { handleGetProductsLocalStorage } from "../persistence/localStorage";
import { handleRenderListItems } from "../views/store";

//=============CATEGORIAS===========
const handleFilterProductsByCategory = (categoryIn) => {
  const products = handleGetProductsLocalStorage();
  if (categoryIn === categoryActive) {
    handleRenderListItems(products);
  } else {
    setCategorieActive(categoryIn);
    if (categoryIn === "Hamburguesas") {
      const result = products.filter((el) => el.categoria === `${categoryIn}`);
      handleRenderListItems(result);
    } else if (categoryIn === "mayorPrecio") {
      let result = products.sort((a, b) => b.precio - a.precio);
      handleRenderListItems(result);
    } else if (categoryIn === "menorPrecio") {
      let result = products.sort((a, b) => a.precio - b.precio);
      handleRenderListItems(result);
    } else if (categoryIn === "Papas") {
      const result = products.filter((el) => el.categoria === `${categoryIn}`);
      handleRenderListItems(result);
    } else if (categoryIn === "Gaseosas") {
      const result = products.filter((el) => el.categoria === `${categoryIn}`);
      handleRenderListItems(result);
    } else {
      handleRenderListItems(products);
    }
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
