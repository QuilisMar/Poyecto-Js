// Datos de las películas
const movies = [
    {
        title: "Bettlejuice",
        image: "img/posters/Bettlejuice.jpeg",
        price: "$9.99",
        synopsisId: "Bettlejuice"
    },
    {
        title: "El Planeta del Tesoro",
        image: "img/posters/El planeta del tesoro.jpeg",
        price: "$9.99",
        synopsisId: "PlanetaDelTesoro"
    },
    {
        title: "El Retorno del Rey",
        image: "img/posters/El retorno del rey.jpeg",
        price: "$9.99",
        synopsisId: "RetornoDelRey"
    },
    {
        title: "Mr.Nobody",
        image: "img/posters/Mr.nobody.jpeg",
        price: "$9.99",
        synopsisId: "MrNobody"
    }
];

// Función para generar las tarjetas
function generateMovieCards() {
    const moviesGrid = document.getElementById('moviesGrid');
    movies.forEach(movie => {
        // Crear elementos
        const card = document.createElement('div');
        card.classList.add('movie-card');

        const img = document.createElement('img');
        img.src = movie.image;
        img.alt = `${movie.title} Poster`;
        img.onclick = () => redirectToSynopsis(movie.synopsisId);

        const title = document.createElement('h3');
        title.textContent = movie.title;

        const price = document.createElement('p');
        price.textContent = movie.price;

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');

        const viewButton = document.createElement('button');
        viewButton.classList.add('btn');
        viewButton.textContent = 'Ver Más';
        viewButton.onclick = () => redirectToSynopsis(movie.synopsisId);

        const addToCartButton = document.createElement('button');
        addToCartButton.classList.add('btn');
        addToCartButton.textContent = 'Agregar al Carrito';
        addToCartButton.onclick = () => addToCart(movie.title);

        // Agregar botones al contenedor
        buttonContainer.appendChild(viewButton);
        buttonContainer.appendChild(addToCartButton);

        // Agregar elementos al card
        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(price);
        card.appendChild(buttonContainer);

        // Agregar card al grid
        moviesGrid.appendChild(card);
    });
}

// Llamar a la función al cargar la página
document.addEventListener('DOMContentLoaded', generateMovieCards);
