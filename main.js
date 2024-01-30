// main.js
import { renderCategories } from "./helpers/categories/categories";
import { handleSearchProducByName } from "./helpers/searchBar/searchBar";
import { handleGetProductsToStore } from "./helpers/store/store";
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
