//===============localstorage===============
//funcionpara traer los productos del localStorage
export const handleGetProductsLocalStorage = () => {
  return JSON.parse(localStorage.getItem("products"));
};

//funcionpara setear los productos del localStorage
export const setProductsLocalStorage = (item) => {
  // Obtener el array almacenado en localStorage y convertirlo a un array JavaScript
  let storedProducts = handleGetProductsLocalStorage() || [];
  if (item) {
    // Buscar si ya existe un producto con el mismo id
    const existingProductIndex = storedProducts.findIndex(
      (product) => product.id === item.id
    );

    if (existingProductIndex !== -1) {
      // Si existe, reemplazar el producto en el mismo índice
      storedProducts[existingProductIndex] = item;
    } else {
      // Si no existe, agregar el nuevo producto al array
      storedProducts.push(item);
    }
  }
  // Convertir el objeto a una cadena JSON y almacenar en localStorage
  localStorage.setItem("products", JSON.stringify(storedProducts));
};
