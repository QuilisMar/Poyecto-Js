
// Obtener el botón del carrito y el dropdown
const carritoBtn = document.querySelector('.carrito-btn');
const carritoDropdown = document.querySelector('.carrito-dropdown');

// Función para alternar la visibilidad del dropdown
carritoBtn.addEventListener('click', function() {
    carritoDropdown.classList.toggle('show');
});

// Variables para manejar el carrito
let total = 0; // Total inicial
const carritoLista = document.getElementById('carrito-lista'); // Lista de productos
const totalSpan = document.getElementById('total'); // Contenedor del total
const carritoVacio = document.getElementById('carrito-vacio'); // Mensaje de carrito vacío

// Función para obtener el precio de la película por su ID
function getMoviePriceById(movieId) {
    const moviePrices = {
        'Bettlejuice': 9.99,
        'PlanetaDelTesoro': 9.99,
        'RetornoDelRey': 9.99,
        'MrNobody': 9.99,
    };
    return moviePrices[movieId] || 0; // Retorna 0 si no se encuentra el ID
}




function addToCart(movieId) {
    const movieTitle = getMovieTitleById(movieId); // Obtiene el título de la película
    const moviePrice = getMoviePriceById(movieId); // Obtiene el precio de la película
    const movieImage = getMovieImageById(movieId); // Obtiene la portada de la película

    // Buscar si el producto ya está en la lista del carrito
    const existingItem = [...carritoLista.children].find(item => item.dataset.movieId === movieId);

    if (existingItem) {
        // Si ya existe, actualiza la cantidad y el subtotal
        const cantidadInput = existingItem.querySelector('.cantidad-input');
        const subtotalSpan = existingItem.querySelector('.subtotal');

        let cantidadActual = parseInt(cantidadInput.value);
        cantidadActual += 1; // Incrementa la cantidad

        cantidadInput.value = cantidadActual; // Actualiza la cantidad
        subtotalSpan.textContent = `= $${(cantidadActual * moviePrice).toFixed(2)}`; // Actualiza el subtotal
    } else {
        // Si no existe, crea un nuevo elemento de producto
        const productoItem = document.createElement('li');
        productoItem.dataset.movieId = movieId; // Añadir el ID como atributo de datos
        productoItem.innerHTML = `
            <img src="${movieImage}" alt="${movieTitle}" class="carrito-img">
            <div class="carrito-info">
                <span class="movie-title">${movieTitle}</span>
                <br>
                <button class="btn-cantidad" onclick="updateQuantity('${movieId}', -1)">-</button>
                <input type="number" class="cantidad-input" value="1" min="1" 
                       onchange="setCustomQuantity('${movieId}', this.value)">
                <button class="btn-cantidad" onclick="updateQuantity('${movieId}', 1)">+</button>
                <span class="subtotal">= $${moviePrice.toFixed(2)}</span>
            </div>
        `;
        carritoLista.appendChild(productoItem); // Añade el producto al carrito
    }

    carritoVacio.style.display = 'none'; // Ocultar el mensaje de "carrito vacío"
    total += moviePrice; // Actualizar el total
    totalSpan.textContent = `$${total.toFixed(2)}`;
}



// Función para actualizar la cantidad con los botones "+" y "-"
function updateQuantity(movieId, change) {
    const productoItem = [...carritoLista.children].find(item => item.dataset.movieId === movieId);

    if (!productoItem) return; // Si no existe el producto, salir

    const cantidadInput = productoItem.querySelector('.cantidad-input');
    const subtotalSpan = productoItem.querySelector('.subtotal');
    const moviePrice = getMoviePriceById(movieId); // Obtener el precio del producto

    let cantidadActual = parseInt(cantidadInput.value);
    cantidadActual += change; // Cambiar la cantidad según el valor (+1 o -1)

    // Si la cantidad es 0 o menor, eliminamos el producto
    if (cantidadActual <= 0) {
        productoItem.remove(); // Elimina el producto del carrito
        actualizarTotal(); // Actualiza el total después de la eliminación
        return; // Salir de la función si se elimina el producto
    }

    // Actualiza la cantidad en el input
    cantidadInput.value = cantidadActual;

    // Actualiza el subtotal
    subtotalSpan.textContent = `= $${(cantidadActual * moviePrice).toFixed(2)}`;

    actualizarTotal(); // Actualizar el total general
}


// Función para manejar la cantidad personalizada del input
function setCustomQuantity(movieId, value) {
    const productoItem = [...carritoLista.children].find(item => item.dataset.movieId === movieId);

    if (!productoItem) return; // Si no existe el producto, salir

    const cantidadInput = productoItem.querySelector('.cantidad-input');
    const subtotalSpan = productoItem.querySelector('.subtotal');
    const moviePrice = getMoviePriceById(movieId); // Obtener el precio del producto

    let cantidadNueva = parseInt(value);

    // Si la cantidad es 0 o menor, eliminamos el producto
    if (cantidadNueva <= 0) {
        productoItem.remove(); // Elimina el producto del carrito
        actualizarTotal(); // Actualizar el total después de la eliminación
        return; // Salir de la función si se elimina el producto
    }

    // Validar la entrada (mínimo 1)
    if (isNaN(cantidadNueva) || cantidadNueva < 1) {
        cantidadNueva = 1;
        cantidadInput.value = 1; // Asegurarse de que el input tenga un valor válido
    }

    cantidadInput.value = cantidadNueva; // Actualizar la cantidad en el input
    subtotalSpan.textContent = `= $${(cantidadNueva * moviePrice).toFixed(2)}`; // Actualizar el subtotal

    actualizarTotal(); // Actualizar el total
}


// Función para actualizar el total del carrito
function actualizarTotal() {
    let nuevoTotal = 0;
    const productos = [...carritoLista.children];

    // Recalcular el total
    productos.forEach(productoItem => {
        const cantidad = parseInt(productoItem.querySelector('.cantidad-input').value);
        const price = getMoviePriceById(productoItem.dataset.movieId);
        nuevoTotal += cantidad * price; // Sumar al total el subtotal de cada producto
    });

    // Actualizar el total en la interfaz
    totalSpan.textContent = `$${nuevoTotal.toFixed(2)}`;

    // Verificar si el carrito está vacío
    if (productos.length === 0) {
        carritoVacio.style.display = 'block'; // Mostrar mensaje de "carrito vacío"
    } else {
        carritoVacio.style.display = 'none'; // Ocultar mensaje de "carrito vacío"
    }
}
