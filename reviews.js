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
//Inicializa con una calificación de 0
updateRating(0);