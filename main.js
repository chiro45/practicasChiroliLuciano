// main.js
import "./style.css";

//=======variables de mi aplicacion===========
//categoria activa
let categoryActive = null;
//elemento activo
let elementActive = null;

//===============localstorage===============
//funcionpara traer los productos del localStorage
const handleGetProductsLocalStorage = () => {
  return JSON.parse(localStorage.getItem("products"));
};

//funcionpara setear los productos del localStorage
const setProductsLocalStorage = (item) => {
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

//=========STORE===================
//funcion que trae los datos de la bd
const viewStorefn = () => {
  const product = handleGetProductsLocalStorage();
  if (product) {
    handleRenderList(product);
  } else {
    setProductsLocalStorage();
  }
};

//funcion que realiza el render de la lista
const handleRenderList = (productsIn) => {
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
      elementActive = producto;
      handleProductActive(producto);
    });
  });
};

//==========SEARCHBAR=========================
const inputSearch = document.getElementById("inputSearch"),
  buttonSearch = document.getElementById("buttonSearch");

buttonSearch.addEventListener("click", () => {
  handleSearch();
});

const handleSearch = () => {
  const products = handleGetProductsLocalStorage();
  const result = products.filter((el) =>
    el.nombre.toLowerCase().includes(inputSearch.value)
  );
  handleRenderList(result);
};

//=============CATEGORIAS===========
const handleFilterProducts = (categoryIn) => {
  const products = handleGetProductsLocalStorage();
  if (categoryIn === categoryActive) {
    handleRenderList(products);
  } else {
    categoryActive = categoryIn;
    if (categoryIn === "Hamburguesas") {
      const result = products.filter((el) => el.categoria === `${categoryIn}`);
      handleRenderList(result);
    } else if (categoryIn === "mayorPrecio") {
      let result = products.sort((a, b) => b.precio - a.precio);
      handleRenderList(result);
    } else if (categoryIn === "menorPrecio") {
      let result = products.sort((a, b) => a.precio - b.precio);
      handleRenderList(result);
    } else if (categoryIn === "Papas") {
      const result = products.filter((el) => el.categoria === `${categoryIn}`);
      handleRenderList(result);
    } else if (categoryIn === "Gaseosas") {
      const result = products.filter((el) => el.categoria === `${categoryIn}`);
      handleRenderList(result);
    } else {
      handleRenderList(products);
    }
  }
};
//render de la vista de las categorias
const viewFilter = () => {
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
      handleFilterProducts(liElement.id);
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

//===========POPUP===========
const openPopUp = () => {
  document.getElementById("myModal").style.display = "flex";

  const buttonDelete = document.getElementById("deleterBtn");
  if (elementActive) {
    buttonDelete.style.display = "block";
  } else {
    buttonDelete.style.display = "none";
  }
};
const closePopUP = () => {
  document.getElementById("myModal").style.display = "none";
};
// Asignar las funciones a los botones

const saveProduct = () => {
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
      ...product,
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
  viewStorefn();
  closePopUP();
  elementActive = null;
};
// guardar el producto
document.getElementById("aceptarBtn").addEventListener("click", saveProduct);

const cancelar = () => {
  // Obtener los elementos de entrada
  let nameInput = document.getElementById("name");
  let imagenInput = document.getElementById("imagen");
  let precioInput = document.getElementById("precio");
  let categoriaInput = document.getElementById("categoria");

  // Establecer los valores en los campos de entrada
  nameInput.value = "";
  imagenInput.value = "";
  precioInput.value = 0;
  categoriaInput.value = "Seleccione una categoria";

  // Cerrar el modal (en este caso, simplemente ocultarlo)
  closePopUP();
  elementActive = null;
};
// manejar el evento de clic en el botón "cancelar"
document.getElementById("cancelarBtn").addEventListener("click", cancelar);

// Función para mostrar la información de un producto
const mostrarInformacionProducto = (producto) => {
  // Obtener los elementos de entrada
  let nameInput = document.getElementById("name");
  let imagenInput = document.getElementById("imagen");
  let precioInput = document.getElementById("precio");
  let categoriaInput = document.getElementById("categoria");

  // Establecer los valores en los campos de entrada
  nameInput.value = producto.nombre;
  imagenInput.value = producto.imagen;
  precioInput.value = producto.precio;
  categoriaInput.value = producto.categoria;

  const buttonDelete = document.getElementById("deleterBtn");

  buttonDelete.addEventListener("click", () => {
    handleDeleteProduct();
  });

  // Mostrar el modal
  openPopUp();
};

const handleDeleteProduct = () => {
  const products = handleGetProductsLocalStorage();
  const resutl = products.filter((el) => el.id !== elementActive.id);
  localStorage.setItem("products", JSON.stringify(resutl));
  viewStorefn();
  closePopUP();
};

const handleProductActive = (product) => {
  openPopUp();
  // Llamada a la función para mostrar la información del producto activo
  mostrarInformacionProducto(product);
};

const buttonAddProduc = document.getElementById("addProduct");
buttonAddProduc.addEventListener("click", () => {
  openPopUp();
});

//primerRender para visualizacion de la store
viewFilter();
viewStorefn();
