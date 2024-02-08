
import { handleGetProductsLocalStorage } from "../persistence/localStorage";
import { handleRenderListItems } from "../views/store";


//==========SEARCHBAR=========================
export const inputSearch = document.getElementById("inputSearch");

export const handleSearchProducByName = () => {
  const products = handleGetProductsLocalStorage();
  const result = products.filter((el) =>
    el.nombre.toLowerCase().includes(inputSearch.value)
  );
  handleRenderListItems(result);
};
