
// Funciones para obtener datos de películas
function getMovieTitleById(movieId) {
    const movieTitles = {
        'Bettlejuice': 'Bettlejuice',
        'PlanetaDelTesoro': 'El Planeta Del Tesoro',
        'RetornoDelRey': 'El Retorno Del Rey',
        'MrNobody': 'Mr.Nobody',
        'ElOrigen': 'El Origen',
        'Endgame': 'Endgame',
        'HarryPotter6': 'El Misterio del Príncipe',
        'Intensamente': 'Intensamente',
        'JurassicPark': 'Jurassic Park',
        'Narnia': 'Narnia',
        'Shrek2': 'Shrek 2',
        'UltimoJedi': 'El Último Jedi',
        'TierraDeOsos': 'Tierra de Osos',
    };
    return movieTitles[movieId] || null;
}

function getMovieImageById(movieId) {
    const movieImages = {
        'Bettlejuice': 'img/posters/Bettlejuice.jpeg',
        'PlanetaDelTesoro': 'img/posters/El planeta del tesoro.jpeg',
        'RetornoDelRey': 'img/posters/El retorno del rey.jpeg',
        'MrNobody': 'img/posters/Mr.nobody.jpeg',
        'ElOrigen': 'img/posters/El origen.jpeg',
        'Endgame': 'img/posters/Endgame.jpeg',
        'HarryPotter6': 'img/posters/Harry potter 6.jpeg',
        'Intensamente': 'img/posters/Intensamente.jpeg',
        'JurassicPark': 'img/posters/Jurassic park.jpeg',
        'Narnia': 'img/posters/Narnia.jpeg',
        'Shrek2': 'img/posters/Shrek 2.jpeg',
        'UltimoJedi': 'img/posters/Star wars.jpeg',
        'TierraDeOsos': 'img/posters/Tierra de osos.jpeg',
    };
    return movieImages[movieId] || 'https://via.placeholder.com/150';
}

function getMovieVideoById(movieId) {
    const movieVideos = {
        'Bettlejuice': "https://www.youtube.com/embed/0S_C3UGazkc?si=KOAZN3mojBpc6wNA",  
        'PlanetaDelTesoro': "https://www.youtube.com/embed/0QOfbX9Hg7E?si=aPvUG72OqMeCLsYi",
        'RetornoDelRey': "https://www.youtube.com/embed/y2rYRu8UW8M?si=CyNxrQ7b5F1q7PNJ",
        'MrNobody': "https://www.youtube.com/embed/vXf3gVYXlHg?si=nqApmd-rtTe6dgjP",
    };
    return movieVideos[movieId] || '';
}

function getMovieSynopsisById(movieId) {
    const movieSynopses = {
        'Bettlejuice': 'Un joven que después de morir, intenta asustar a los nuevos propietarios de su casa, pero pronto se encuentra con un extraño fantasma que tiene sus propios planes.',
        'PlanetaDelTesoro': 'Un joven se embarca en una aventura espacial para encontrar un legendario tesoro perdido en un planeta lejano.',
        'RetornoDelRey': 'La guerra final por la Tierra Media ha comenzado, y los pueblos libres deben unirse para derrotar a Sauron y destruir el Anillo Único.',
        'MrNobody': 'En un futuro cercano, un hombre que es el último mortal vivo, reflexiona sobre sus decisiones y su vida pasada a través de las infinitas posibilidades de su existencia.',
        'ElOrigen': 'Un ladrón que roba secretos corporativos a través del uso de tecnología de sueños debe llevar a cabo un último trabajo.',
        'Endgame': 'Los Vengadores restantes deben unirse para revertir el daño causado por Thanos y restaurar el orden en el universo.',
        'HarryPotter6': 'Harry Potter descubre los oscuros secretos de Voldemort mientras se enfrenta a nuevos desafíos en su sexto año en Hogwarts.',
        'Intensamente': 'Una niña y sus emociones navegan los desafíos de la vida mientras enfrentan un gran cambio en su vida.',
        'JurassicPark': 'Un parque temático con dinosaurios se convierte en una pesadilla cuando los animales escapan y causan caos.',
        'Narnia': 'Cuatro hermanos descubren un mundo mágico y luchan para restaurar la paz en Narnia.',
        'Shrek2': 'Shrek y Fiona regresan al reino de Muy Muy Lejano para conocer a los padres de Fiona, lo que lleva a nuevas aventuras.',
        'UltimoJedi': 'Rey busca orientación de Luke Skywalker mientras la Resistencia lucha contra la Primera Orden.',
        'TierraDeOsos': 'Un joven convertido en oso debe aprender lecciones de vida mientras intenta revertir la transformación.',
    };
    return movieSynopses[movieId] || 'Sinopsis no disponible';
}



// Lista de todas las películas
const allMovies = [
    'Bettlejuice', 'PlanetaDelTesoro', 'RetornoDelRey', 'MrNobody', 
    'ElOrigen', 'Endgame', 'HarryPotter6', 'Intensamente', 'JurassicPark', 
    'Narnia', 'Shrek2', 'UltimoJedi', 'TierraDeOsos'
];

// Función para obtener una clave única basada en la fecha actual
function getDailyKey() {
    const today = new Date();
    return `movies_${today.getFullYear()}_${today.getMonth() + 1}_${today.getDate()}`;
}

// Función para seleccionar aleatoriamente un número específico de películas
function getRandomMovies(count) {
    const dailyKey = getDailyKey();

    // Verificar si ya hay una selección almacenada para hoy
    const storedMovies = localStorage.getItem(dailyKey);
    if (storedMovies) {
        return JSON.parse(storedMovies); // Retornar la selección guardada
    }

    // Si no hay selección almacenada, generar una nueva
    const shuffled = allMovies.sort(() => 0.5 - Math.random()); // Mezcla aleatoria
    const selectedMovies = shuffled.slice(0, count); // Selecciona los primeros 'count' elementos

    // Guardar la selección en localStorage
    localStorage.setItem(dailyKey, JSON.stringify(selectedMovies));

    return selectedMovies;
}


// Seleccionar 4 películas aleatorias para la oferta
const offerMovies = getRandomMovies(4);
// El resto de las películas van al catálogo
const catalogMovies = allMovies.filter(movie => !offerMovies.includes(movie));

const standardPrice = 14.99;
const offerPrice = 9.99;

function getMoviePriceById(movieId) {
    // Verificar si la película está en oferta
    if (offerMovies.includes(movieId)) {
        return offerPrice;
    }
    return standardPrice;
}

// Redirige a la página de sinopsis con el ID de la película en la URL
function redirectToSynopsis(movieId) {
    console.log(`Redirigiendo a la sinopsis de ${movieId}`);  // Para verificar que el ID se pasa correctamente
    window.location.href = `sinopsis.html?movieId=${movieId}`;
}


// Crear la tarjeta de la película (usada para las ofertas y catálogo)
function createMovieCard(movieId, price) {
    const card = document.createElement('div');
    card.classList.add('movie-card');

    const img = document.createElement('img');
    img.src = getMovieImageById(movieId);
    img.alt = `${getMovieTitleById(movieId)} Poster`;
    img.onclick = () => redirectToSynopsis(movieId);

    const title = document.createElement('h3');
    title.textContent = getMovieTitleById(movieId);

    const priceElement = document.createElement('p');
    priceElement.textContent = price;

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');

    const viewButton = document.createElement('button');
    viewButton.classList.add('btn');
    viewButton.textContent = 'Ver Más';
    viewButton.onclick = () => redirectToSynopsis(movieId);

    const addToCartButton = document.createElement('button');
    addToCartButton.classList.add('btn');
    addToCartButton.textContent = 'Agregar al Carrito';
    addToCartButton.onclick = () => addToCart(movieId);

    buttonContainer.appendChild(viewButton);
    buttonContainer.appendChild(addToCartButton);

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(priceElement);
    card.appendChild(buttonContainer);

    return card;
}

// Generar las tarjetas de las películas en oferta (index.html)
function generateOfferMovies() {
    const moviesGrid = document.getElementById('moviesGrid');
    if (!moviesGrid) return;

    offerMovies.forEach(movieId => {
        const card = createMovieCard(movieId, getMoviePriceById(movieId)); // Llamar a la función para crear la tarjeta con el precio de oferta
        moviesGrid.appendChild(card);
    });
}

// Generar las tarjetas del catálogo completo (catalogo.html)
function generateCatalogMovies() {
    const moviesGrid = document.getElementById('moviesGrid');
    if (!moviesGrid) return;

    catalogMovies.forEach(movieId => {
        const card = createMovieCard(movieId, '$14.99'); // Llamar a la función para crear la tarjeta con el precio estándar
        moviesGrid.appendChild(card);
    });
}

// Llamar a las funciones correspondientes según la página cargada
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('index.html')) {
        generateOfferMovies();  // Mostrar solo las películas en oferta en index.html
    } else if (window.location.pathname.includes('catalogo.html')) {
        generateCatalogMovies(); // Mostrar las demás películas en catalogo.html
    }
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('movieId');  // Obtiene el movieId de la URL
    
    if (movieId) {
        console.log(`Cargando sinopsis para la película con ID: ${movieId}`);
        document.getElementById('movie-title').innerText = getMovieTitleById(movieId);
        const movieImage = getMovieImageById(movieId);
        console.log(`Imagen para la película: ${movieImage}`);
        document.getElementById('movie-image').src = movieImage;

        // Obtener el trailer
        const movieVideo = getMovieVideoById(movieId);
        const iframe = document.getElementById('movie-trailer');
        iframe.src = movieVideo;  // Establecer la URL del trailer en el iframe

        // Obtener la sinopsis
        const synopsis = getMovieSynopsisById(movieId);
        document.querySelector('.movie-details p').innerText = synopsis;
    } else {
        console.log("No se encontró el movieId en la URL.");
    }
});
