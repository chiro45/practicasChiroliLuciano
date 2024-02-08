// main.js

import { renderCategories } from "./src/services/categories";
import { handleSearchProducByName } from "./src/services/searchBar";
import { handleGetProductsToStore } from "./src/views/store";
import "./style.css";

//=======variables de mi aplicacion===========
//categoria activa
export let categoryActive = null;
//elemento activo
export let elementActive = null;
//setters para mis variables
export const setCategorieActive = (categorieIn) => {
  categoryActive = categorieIn;
};
export const setProductActive = (productIn) => {
  elementActive = productIn;
};
//primerRender para visualizacion de la store
renderCategories();
handleGetProductsToStore();

//barra de busqueda
const buttonConfirmSearch = document.getElementById("buttonSearch");
buttonConfirmSearch.addEventListener("click", () => {
  handleSearchProducByName();
});
