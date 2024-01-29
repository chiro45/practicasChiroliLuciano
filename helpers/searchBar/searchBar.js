import { handleGetProductsLocalStorage } from "../localStorage/localStorage";
import { handleRenderListItems } from "../store/store";

//==========SEARCHBAR=========================
export const inputSearch = document.getElementById("inputSearch");

export const handleSearchProducByName = () => {
  const products = handleGetProductsLocalStorage();
  const result = products.filter((el) =>
    el.nombre.toLowerCase().includes(inputSearch.value)
  );
  handleRenderListItems(result);
};
const buttonConfirmSearch = document.getElementById("buttonSearch");

buttonConfirmSearch.addEventListener("click", () => {
  handleSearchProducByName();
});
