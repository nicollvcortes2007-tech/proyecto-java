const botonCarrito = document.querySelector(".carrito");
const ventanaCarrito = document.querySelector(".ventana-carrito");
const botonCerrar = document.querySelector(".ventana-carrito header button");

const productos = document.querySelectorAll(".producto");
const lista = document.querySelector(".lista");
const cantidad = document.querySelector(".cantidad");

// Selectores para mostrar subtotal, descuento y total final
const subtotalElemento = document.querySelector(".subtotal-valor");
const descuentoElemento = document.querySelector(".descuento-valor");
const totalElemento = document.querySelector(".total strong:last-of-type") || document.querySelector(".total strong");

let carrito = [];


// ABRIR CARRITO

botonCarrito.addEventListener("click", () => {
    ventanaCarrito.style.display = "block";
});


// CERRAR CARRITO

botonCerrar.addEventListener("click", () => {
    ventanaCarrito.style.display = "none";
});


// PRODUCTOS

productos.forEach((producto) => {

    const botonImagen = producto.querySelector(".imagen");
    const descripcion = producto.querySelector(".descripcion");
    const botonAgregar = producto.querySelector(".agregar");


    // Ocultar descripción inicialmente

    descripcion.style.display = "none";


    // Mostrar / ocultar descripción

    botonImagen.addEventListener("click", () => {

        if (descripcion.style.display === "none") {
            descripcion.style.display = "block";
        } else {
            descripcion.style.display = "none";
        }

    });


    // Agregar producto

    botonAgregar.addEventListener("click", () => {

        const nombre = producto.querySelector("h3").textContent;

        const precioTexto = producto.querySelector(".precio").textContent;

        const precio = Number(
            precioTexto
                .replace("$", "")
                .replace(/\./g, "")
        );


        // Buscar si ya existe

        const productoExistente = carrito.find(
            (item) => item.nombre === nombre
        );


        if (productoExistente) {

            productoExistente.cantidad++;

        } else {

            carrito.push({
                nombre: nombre,
                precio: precio,
                cantidad: 1
            });

        }


        actualizarCarrito();

        // Abrir automáticamente el carrito

        ventanaCarrito.style.display = "block";

    });

});


// ACTUALIZAR CARRITO

function actualizarCarrito() {

    lista.innerHTML = "";

    let subtotalCarrito = 0;
    let cantidadProductos = 0;


    carrito.forEach((producto, indice) => {

        const elemento = document.createElement("li");

        elemento.classList.add("elemento");


        // Nombre

        const nombre = document.createElement("span");

        if (producto.cantidad > 1) {
            nombre.textContent = `${producto.nombre} (x${producto.cantidad})`;
        } else {
            nombre.textContent = producto.nombre;
        }


        // Precio

        const precio = document.createElement("span");

        const precioProducto =
            producto.precio * producto.cantidad;

        precio.textContent =
            `$${precioProducto.toLocaleString("es-CO")}`;


        // Botón eliminar

        const eliminar = document.createElement("button");

        eliminar.type = "button";

        eliminar.textContent = "Eliminar";


        eliminar.addEventListener("click", () => {

            carrito.splice(indice, 1);

            actualizarCarrito();

        });


        // Agregar elementos al producto

        elemento.appendChild(nombre);
        elemento.appendChild(precio);
        elemento.appendChild(eliminar);

        lista.appendChild(elemento);


        // Calcular subtotal

        subtotalCarrito += precioProducto;

        cantidadProductos += producto.cantidad;

    });


    // --- CÁLCULO DEL DESCUENTO DEL 10% ---
    const descuento = subtotalCarrito * 0.10;
    const totalFinal = subtotalCarrito - descuento;


    // Actualizar contador de cantidad
    cantidad.textContent = cantidadProductos;


    // Actualizar los valores en la interfaz del carrito
    if (subtotalElemento) {
        subtotalElemento.textContent = `$${subtotalCarrito.toLocaleString("es-CO")}`;
    }

    if (descuentoElemento) {
        descuentoElemento.textContent = `-$${descuento.toLocaleString("es-CO")}`;
    }

    if (totalElemento) {
        totalElemento.textContent = `$${totalFinal.toLocaleString("es-CO")}`;
    }

}