function mostrarOtro() {
    var paisSelect = document.getElementById("pais");
    var otroPaisContainer = document.getElementById("otroPaisContainer");

    // Verifica si la opción seleccionada es "Otro"
    if (paisSelect.value === "otro") {
        otroPaisContainer.style.display = "block"; // Muestra el campo de texto
    } else {
        otroPaisContainer.style.display = "none"; // Oculta el campo de texto
    }
}

function validateForm() {
    const email = document.getElementById('email').value;
    const confirmEmail = document.getElementById('verificar-email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('verificar-password').value;

    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    
    let valid = true;

    // Validación de coincidencia de email
    if (email !== confirmEmail) {
        emailError.style.display = 'block';
        valid = false;
    } else {
        emailError.style.display = 'none';
    }

    // Validación de coincidencia de contraseña
    if (password !== confirmPassword) {
        passwordError.style.display = 'block';
        valid = false;
    } else {
        passwordError.style.display = 'none';
    }

    // Si el formulario es válido, enviar el formulario
    if (valid) {
        sendEmail(); // Llama a la función para enviar el formulario
    }

    return false; // Evita el envío del formulario por defecto
}

function sendEmail() {
    // Captura los valores del formulario
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const email = document.getElementById('email').value;
    const fecha = document.getElementById('fecha-cumpleaños').value;
    const pais = document.getElementById('pais').value;

    // Envío del correo
    emailjs.send("service_nogfamd", "template_j9nxiht", {
        to_name: "Martin", // Cambia esto al nombre del destinatario si es necesario
        nombre: nombre,
        apellido: apellido,
        email: email, // Asegúrate de que esto coincida con tu plantilla
        fecha: fecha, // Asegúrate de que esto coincida con tu plantilla
        pais: pais // Asegúrate de que esto coincida con tu plantilla
    })
    .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        showNotification("¡Registro exitoso!"); // Muestra un mensaje de éxito
    }, function(error) {
        console.log('FAILED...', error); // Muestra el error en la consola
        showNotification("Error al enviar el formulario: " + JSON.stringify(error)); // Muestra un mensaje de error
    });
}


// Función para mostrar la notificación emergente
function showNotification(message, type) {
    const notification = document.getElementById("notification");
    notification.textContent = message;
    
    // Cambia el color de fondo según el tipo de notificación
    notification.className = "notification show";
    if (type === "error") {
        notification.classList.add("error");
    }
    
    // Oculta la notificación después de 3 segundos
    setTimeout(() => {
        notification.classList.add("fade-out");

        // Remueve la notificación después de que se desvanezca
        setTimeout(() => {
            notification.className = "notification"; // Reinicia la clase para futuras notificaciones
        }, 500); // Espera que termine la transición de desvanecimiento (0.5s)
    }, 5000); // Notificación visible durante 3 segundos
}


// Redirige a la página de sinopsis con el ID de la película en la URL
function redirectToSynopsis(movieId) {
    window.location.href = `sinopsis.html?movieId=${movieId}`;
}



// Al cargar sinopsis.html, extrae el ID de la película y muestra su información
window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('movieId');
    
    if (movieId) {
        // Llamar a la función que obtiene el título y la imagen de la película
        document.getElementById('movie-title').innerText = getMovieTitleById(movieId);
        const movieImage = getMovieImageById(movieId);
        document.getElementById('movie-image').src = movieImage;  // Asegúrate de que el ID de la imagen sea correcto
    }
};

// Simula la obtención del título de la película según el ID
function getMovieTitleById(movieId) {
    const movieTitles = {
        'Bettlejuice': 'Bettlejuice',
        'PlanetaDelTesoro': 'El Planeta Del Tesoro',
        'RetornoDelRey': 'El Retorno Del Rey',
        'MrNobody': 'Mr.Nobody',
    };
    return movieTitles[movieId] || 'Película Desconocida';
}

// Simula la obtención de la imagen de la película según el ID
function getMovieImageById(movieId) {
    const movieImages = {
        'Bettlejuice': 'img/posters/Bettlejuice.jpeg',
        'PlanetaDelTesoro': 'img/posters/El planeta del tesoro.jpeg',
        'RetornoDelRey': 'img/posters/El retorno del rey.jpeg',
        'MrNobody': 'img/posters/Mr.nobody.jpeg',
    };
    return movieImages[movieId] || 'https://via.placeholder.com/150';
}

function submitReview() {
    const name = document.getElementById('review-name').value.trim();
    const text = document.getElementById('review-text').value.trim();
    
    // Tomar el puntaje directamente del elemento de visualización
    const rating = parseFloat(document.getElementById('rating-display').textContent);

    // Validar si el nombre, la reseña y la puntuación están completos
    if (name && text && rating >= 0) {
        const reviewList = document.getElementById('reviews-list');

        // Crear un nuevo elemento de reseña
        const reviewItem = document.createElement('div');
        reviewItem.classList.add('review-item');

        // Utilizar backticks para poder interpolar las variables en el HTML
        reviewItem.innerHTML = `
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Puntuación:</strong> ${rating} / 10</p>
            <p><strong>Reseña:</strong> ${text}</p>
        `;

        // Añadir la reseña a la lista de reseñas
        reviewList.appendChild(reviewItem);

        // Limpiar los campos del formulario
        document.getElementById('review-form').reset();

        // Reiniciar la puntuación de las estrellas y el puntaje mostrado
        resetStars();
        document.getElementById('rating-display').textContent = "0.0";
        showNotification('¡Reseña cargada exitosamente!');
    } else {
        showNotification('Por favor, completa todos los campos antes de enviar la reseña.', "error");
    }
}


function resetStars() {
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
        star.classList.remove('filled');
        star.querySelector('.star-half.left').classList.remove('filled');
        star.querySelector('.star-half.right').classList.remove('filled');
    });
    // Reiniciar el puntaje mostrado a 0.0
    document.getElementById('rating-display').textContent = "0.0";
    updateRating(0);
}


// Función para actualizar la calificación
function updateRating(rating) {
    const stars = document.querySelectorAll('.star');
    const ratingDisplay = document.getElementById('rating-display');
    
    stars.forEach((star, index) => {
        const leftHalf = star.querySelector('.star-half.left');
        const rightHalf = star.querySelector('.star-half.right');
        const starValue = parseFloat(star.getAttribute('data-value'));

        // Limpiar el color de fondo
        leftHalf.style.backgroundColor = "#ccc";
        rightHalf.style.backgroundColor = "#ccc";

        if (rating >= (starValue + 1)) {
            leftHalf.style.backgroundColor = "gold";
            rightHalf.style.backgroundColor = "gold";
        } else if (rating > starValue && rating < (starValue + 1)) {
            leftHalf.style.backgroundColor = "gold";
            rightHalf.style.backgroundColor = "#ccc";
        }
        
        if (starValue <= rating) {
            star.classList.add('filled');
        } else {
            star.classList.remove('filled');
        }
    });

    // Actualizar el texto con el valor de la calificación
    ratingDisplay.textContent = rating.toFixed(1);
}


document.addEventListener("DOMContentLoaded", function() {
    // Asegúrate de que el DOM esté cargado antes de modificar los elementos
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('movieId');
    
    if (movieId) {
        // Llamar a la función que obtiene el título y la imagen de la película
        document.getElementById('movie-title').innerText = getMovieTitleById(movieId);
        const movieImage = getMovieImageById(movieId);
        document.getElementById('movie-image').src = movieImage;  // Asegúrate de que el ID de la imagen sea correcto

        // Obtener y mostrar el video correspondiente
        const movieVideo = getMovieVideoById(movieId);
        const iframe = document.getElementById('movie-trailer'); // Asegúrate de que el ID de iframe sea correcto
        iframe.src = movieVideo; // Establece la URL del video en el iframe
    }
});

// Simula la obtención del video de la película según el ID
function getMovieVideoById(movieId) {
    const movieVideos = {
        'Bettlejuice': "https://www.youtube.com/embed/0S_C3UGazkc?si=KOAZN3mojBpc6wNA",  // Reemplaza con el ID real del video
        'PlanetaDelTesoro': "https://www.youtube.com/embed/0QOfbX9Hg7E?si=aPvUG72OqMeCLsYi" ,
        'RetornoDelRey': "https://www.youtube.com/embed/y2rYRu8UW8M?si=CyNxrQ7b5F1q7PNJ",
        'MrNobody': "https://www.youtube.com/embed/vXf3gVYXlHg?si=nqApmd-rtTe6dgjP",
    };
    return movieVideos[movieId] || '';  // Devuelve un video por defecto si no se encuentra
}


// Función para manejar los clics sobre las mitades de las estrellas
document.querySelectorAll('.star').forEach(star => {
    const leftHalf = star.querySelector('.star-half.left');
    const rightHalf = star.querySelector('.star-half.right');

    leftHalf.addEventListener('click', () => {
        const currentValue = parseFloat(document.getElementById('rating-display').textContent);
        const starValue = parseFloat(star.getAttribute('data-value'));

        // Si es la primera estrella y ya tiene 0.5, reducir a 0
        if (starValue === 0 && currentValue === 0.5) {
            updateRating(0); // Reducir a 0
        } else if (currentValue === (starValue + 0.5)) {
            updateRating(starValue + 1); // Llenar completamente
        } else {
            updateRating(starValue + 0.5); // Llenar solo la mitad
        }
    });

    rightHalf.addEventListener('click', () => {
        const currentValue = parseFloat(document.getElementById('rating-display').textContent);
        const starValue = parseFloat(star.getAttribute('data-value'));

        updateRating(starValue + 1); // Llenar completamente
    });
});

// Inicializar con una calificación de 0
updateRating(0);

// Cargar las reseñas desde un arreglo o de un backend
function loadReviews() {
    const reviews = [
        { name: 'Juan', text: '¡Excelente película!', rating: 8 },
        { name: 'Ana', text: 'Muy buena, aunque esperaba más acción.', rating: 6 },
        { name: 'Carlos', text: 'Me encantó, definitivamente la recomiendo.', rating: 9 },
    ];

    const reviewList = document.getElementById('reviews-list');
    
    reviews.forEach(review => {
        const reviewItem = document.createElement('div');
        reviewItem.classList.add('review-item');

        reviewItem.innerHTML = `
            <p><strong>Nombre:</strong> ${review.name}</p>
            <p><strong>Puntuación:</strong> ${review.rating} / 10</p>
            <p><strong>Reseña:</strong> ${review.text}</p>
        `;

        reviewList.appendChild(reviewItem);
    });
}


// Llamar a la función cuando se carga la página
window.onload = loadReviews;