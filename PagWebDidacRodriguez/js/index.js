function session() {
    let usuari = "admin";
    let contraseña = "1234";
    if (usuari === document.LogIn.username.value && contraseña === document.LogIn.password.value) {
        window.location = "./html/tienda.html";
    } else {
        alert("Nombre de usuario o contraseña incorrectas"); 
    }
}

//Al darle click al boton que me coja el nombre y precio de los productos
document.addEventListener("DOMContentLoaded", () => {
    const botonesCompra = document.querySelectorAll(".añadir");
    botonesCompra.forEach((boton, index) => {
        boton.addEventListener("click", () => {
            const nombreProducto = document.querySelectorAll(".nombre")[index].textContent;
            const precioProducto = parseFloat(document.querySelectorAll(".precio")[index].textContent);
            agregarAlCarrito(nombreProducto, precioProducto);
        });
    });

    // Agregar un evento de click al botón de vaciar carrito
    const botonVaciar = document.getElementById("vaciar");
    botonVaciar.addEventListener("click", vaciarCarrito);

    // Se actaualiza el carrito al recargar pagina
    actualizar();
})

//Función para actualizar el carrito y muestra los productos que se añaden
function actualizar() {
    const carritoLista = document.getElementById("lista");
    const totalElemento = document.getElementById("total");

    // Obtener productos del almacenamiento local
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let precioTotal = parseFloat(localStorage.getItem("precioTotal")) || 0;

    // Limpiar el carrito actual
    carritoLista.innerHTML = "";

    // Recorrer los productos en el carrito y agregarlos al HTML
    carrito.forEach(producto => {
        const listItem = document.createElement("li");
        listItem.textContent = `${producto.nombreProducto}: ${producto.precioProducto}€`;
        carritoLista.appendChild(listItem);
    });

    //Actualizar el precio total
    totalElemento.textContent = precioTotal.toFixed(2);
}

//Funcion para agregar el producto al carrito
function agregarAlCarrito(nombreProducto, precioProducto) {
    // Verificamos si ya hay un carrito en el localstorage
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push({ nombreProducto, precioProducto });
    localStorage.setItem("carrito", JSON.stringify(carrito));

    // Apartado en el que se actualiza el precio total cada vez que se añade un producto al carrito
    let precioTotal = parseFloat(localStorage.getItem("precioTotal")) || 0;
    precioTotal += precioProducto;
    localStorage.setItem("precioTotal", precioTotal.toFixed(2));
    actualizar();
}


//Funcion para poder vaciar el carrito desde el boton y luego actualiza la pagina
function vaciarCarrito() {
    localStorage.removeItem("carrito");
    localStorage.removeItem("precioTotal");
    actualizar();
};