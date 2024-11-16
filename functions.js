//---------------------------------------------------
//            MODULARIZAR ESTE ARCHIVO
//---------------------------------------------------


//Fucion que muestra el campo de texto, cuando se seleccion como pais Otro en las opciones 
function mostrarOtro() {
    var paisSelect = document.getElementById("pais");
    var otroPaisContainer = document.getElementById("otroPaisContainer");

    
    if (paisSelect.value === "otro") {
        otroPaisContainer.style.display = "block"; 
    } else {
        otroPaisContainer.style.display = "none"; 
    }
}

// Función para validar el formulario de contacto
function validateContactForm() {
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const asunto = document.getElementById('asunto').value;
    const mensaje = document.getElementById('mensaje').value;

    
    if (nombre && email && asunto && mensaje) {
        showNotification("¡Mensaje enviado con éxito!"); 
    } else {
        showNotification("Por favor, completa todos los campos.", "error"); 
    }

    return false; 
}



function validateForm() {
    const email = document.getElementById('email').value;
    const confirmEmail = document.getElementById('verificar-email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('verificar-password').value;

    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    
    let valid = true;

    
    if (email !== confirmEmail) {
        emailError.style.display = 'block';
        valid = false;
    } else {
        emailError.style.display = 'none';
    }

    
    if (password !== confirmPassword) {
        passwordError.style.display = 'block';
        valid = false;
    } else {
        passwordError.style.display = 'none';
    }

  
    if (valid) {
        sendEmail(); 
    }

    return false; 
}

function sendEmail() {
   
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const email = document.getElementById('email').value;
    const fecha = document.getElementById('fecha-cumpleaños').value;
    const pais = document.getElementById('pais').value;

    emailjs.send("service_nogfamd", "template_j9nxiht", {
        to_name: "Martin", 
        nombre: nombre,
        apellido: apellido,
        email: email, 
        fecha: fecha, 
        pais: pais
    })
    .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        showNotification("¡Registro exitoso!"); 
    }, function(error) {
        console.log('FAILED...', error); 
        showNotification("Error al enviar el formulario: " + JSON.stringify(error)); 
    });
}


// Función para mostrar la notificación emergente
function showNotification(message, type) {
    const notification = document.getElementById("notification");
    notification.textContent = message;
    
    
    notification.className = "notification show";
    if (type === "error") {
        notification.classList.add("error");
    }
    
    
    setTimeout(() => {
        notification.classList.add("fade-out");

       
        setTimeout(() => {
            notification.className = "notification"; 
        }, 500);
    }, 5000); 
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
        
        document.getElementById('movie-title').innerText = getMovieTitleById(movieId);
        const movieImage = getMovieImageById(movieId);
        document.getElementById('movie-image').src = movieImage;  
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

//Simula la obtención de la sinopsis de la película según el ID
function getMovieSynopsisById(movieId) {
    const movieSynopses = {
        'Bettlejuice': 'Un joven que después de morir, intenta asustar a los nuevos propietarios de su casa, pero pronto se encuentra con un extraño fantasma que tiene sus propios planes.',
        'PlanetaDelTesoro': 'Un joven se embarca en una aventura espacial para encontrar un legendario tesoro perdido en un planeta lejano.',
        'RetornoDelRey': 'La guerra final por la Tierra Media ha comenzado, y los pueblos libres deben unirse para derrotar a Sauron y destruir el Anillo Único.',
        'MrNobody': 'En un futuro cercano, un hombre que es el último mortal vivo, reflexiona sobre sus decisiones y su vida pasada a través de las infinitas posibilidades de su existencia.',
    };
    return movieSynopses[movieId] || 'Sinopsis no disponible';
}



//Funcion que valida el envio de la reseña
function submitReview() {
    const name = document.getElementById('review-name').value.trim();
    const text = document.getElementById('review-text').value.trim();
    
    //Toma el puntaje directamente del elemento de visualización
    const rating = parseFloat(document.getElementById('rating-display').textContent);

    if (name && text && rating >= 0) {
        const reviewList = document.getElementById('reviews-list');

        
        const reviewItem = document.createElement('div');
        reviewItem.classList.add('review-item');

        //Utiliza backticks para poder interpolar las variables en el HTML
        reviewItem.innerHTML = `
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Puntuación:</strong> ${rating} / 10</p>
            <p><strong>Reseña:</strong> ${text}</p>
        `;

        reviewList.appendChild(reviewItem);

        document.getElementById('review-form').reset();

        resetStars();
        document.getElementById('rating-display').textContent = "0.0";
        showNotification('¡Reseña cargada exitosamente!');
    } else {
        showNotification('Por favor, completa todos los campos antes de enviar la reseña.', "error");
    }
}

//Funcion que pone las estrellas en 0
function resetStars() {
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
        star.classList.remove('filled');
        star.querySelector('.star-half.left').classList.remove('filled');
        star.querySelector('.star-half.right').classList.remove('filled');
    });
    
    document.getElementById('rating-display').textContent = "0.0";
    updateRating(0);
}


//Función para actualizar la calificación
function updateRating(rating) {
    const stars = document.querySelectorAll('.star');
    const ratingDisplay = document.getElementById('rating-display');
    
    stars.forEach((star, index) => {
        const leftHalf = star.querySelector('.star-half.left');
        const rightHalf = star.querySelector('.star-half.right');
        const starValue = parseFloat(star.getAttribute('data-value'));

        
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

    //Actualiza el texto con el valor de la calificación
    ratingDisplay.textContent = rating.toFixed(1);
}

//Función para manejar los clics sobre las mitades de las estrellas
document.querySelectorAll('.star').forEach(star => {
    const leftHalf = star.querySelector('.star-half.left');
    const rightHalf = star.querySelector('.star-half.right');

    leftHalf.addEventListener('click', () => {
        const currentValue = parseFloat(document.getElementById('rating-display').textContent);
        const starValue = parseFloat(star.getAttribute('data-value'));

        //Si es la primera estrella y ya tiene 0.5, reducir a 0
        if (starValue === 0 && currentValue === 0.5) {
            updateRating(0); // Reducir a 0
        } else if (currentValue === (starValue + 0.5)) {
            updateRating(starValue + 1); //Llenar completamente
        } else {
            updateRating(starValue + 0.5); //Llenar solo la mitad
        }
    });

    rightHalf.addEventListener('click', () => {
        const currentValue = parseFloat(document.getElementById('rating-display').textContent);
        const starValue = parseFloat(star.getAttribute('data-value'));

        updateRating(starValue + 1); 
    });
});

//Inicializa con una calificación de 0
updateRating(0);


document.addEventListener("DOMContentLoaded", function() {
    // Asegúrate de que el DOM esté cargado antes de modificar los elementos
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('movieId');
    
    if (movieId) {
        document.getElementById('movie-title').innerText = getMovieTitleById(movieId);
        const movieImage = getMovieImageById(movieId);
        document.getElementById('movie-image').src = movieImage;

        //Obtener y mostrar el video correspondiente
        const movieVideo = getMovieVideoById(movieId);
        const iframe = document.getElementById('movie-trailer'); 
        iframe.src = movieVideo; //Establece la URL del video en el iframe

        //Obtener y mostrar la sinopsis
        const synopsis = getMovieSynopsisById(movieId);
        document.querySelector('.movie-details p').innerText = synopsis;

    }
});

//Simula la obtención del video de la película según el ID
function getMovieVideoById(movieId) {
    const movieVideos = {
        'Bettlejuice': "https://www.youtube.com/embed/0S_C3UGazkc?si=KOAZN3mojBpc6wNA",  
        'PlanetaDelTesoro': "https://www.youtube.com/embed/0QOfbX9Hg7E?si=aPvUG72OqMeCLsYi" ,
        'RetornoDelRey': "https://www.youtube.com/embed/y2rYRu8UW8M?si=CyNxrQ7b5F1q7PNJ",
        'MrNobody': "https://www.youtube.com/embed/vXf3gVYXlHg?si=nqApmd-rtTe6dgjP",
    };
    return movieVideos[movieId] || ''; 
}



//Carga reseñas predefinidas
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


//Llama a la función que carga las reseñas cuando se carga la página
window.onload = loadReviews;