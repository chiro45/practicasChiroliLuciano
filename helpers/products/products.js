import { elementActive, setProductActive } from "../../main";
import {
  handleGetProductsLocalStorage,
  setProductsLocalStorage,
} from "../localStorage/localStorage";
import { closePopUP, openPopUp } from "../popUp/popUp";
import { handleGetProductsToStore } from "../store/store";
// Asignar las funciones a los botones
export const saveProduct = () => {
  // Obtener los valores de los campos de entrada
  let name = document.getElementById("name").value;
  let imagen = document.getElementById("imagen").value;
  let precio = document.getElementById("precio").value;
  let categoria = document.getElementById("categoria").value;
  // Crear un objeto con los valores
  let product;
  //editar o guardar un producto si este ya existe
  if (elementActive) {
    product = {
      ...elementActive,
      nombre: name,
      imagen,
      precio,
      categoria,
    };
  } else {
    product = {
      id: new Date(),
      nombre: name,
      imagen,
      precio,
      categoria,
    };
  }
  setProductsLocalStorage(product);
  handleGetProductsToStore();
  closePopUP();
  setProductActive(null);
};
// guardar el producto
document.getElementById("aceptarBtn").addEventListener("click", saveProduct);

export const cancel = () => {
  // Cerrar el modal (en este caso, simplemente ocultarlo)
  closePopUP();
  setProductActive(null);
};
// manejar el evento de clic en el botón "cancelar"
document.getElementById("cancelarBtn").addEventListener("click", cancel);

// Función para mostrar la información de un producto
export const showPropsProduct = (productIn) => {
  // Obtener los elementos de entrada
  let nameInput = document.getElementById("name");
  let imagenInput = document.getElementById("imagen");
  let precioInput = document.getElementById("precio");
  let categoriaInput = document.getElementById("categoria");

  // Establecer los valores en los campos de entrada
  nameInput.value = productIn.nombre;
  imagenInput.value = productIn.imagen;
  precioInput.value = productIn.precio;
  categoriaInput.value = productIn.categoria;

  const buttonDelete = document.getElementById("deleterBtn");

  buttonDelete.addEventListener("click", () => {
    handleDeleteProduct();
  });

  // Mostrar el modal
  openPopUp();
};

export const handleDeleteProduct = () => {
  const products = handleGetProductsLocalStorage();
  const resutl = products.filter((el) => el.id !== elementActive.id);
  localStorage.setItem("products", JSON.stringify(resutl));
  handleGetProductsToStore();
  closePopUP();
};

export const handleProductActive = (product) => {
  openPopUp();
  // Llamada a la función para mostrar la información del producto activo
  showPropsProduct(product);
};

const buttonAddProduc = document.getElementById("addProduct");
buttonAddProduc.addEventListener("click", () => {
  openPopUp();
});
