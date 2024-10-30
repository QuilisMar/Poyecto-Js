// functions.js
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

// Función para cargar contenido en un elemento
function loadContent(url, elementId) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al cargar ${url}`);
            }
            return response.text();
        })
        .then(data => {
            const element = document.getElementById(elementId);

            // Limpiar contenido previo para evitar duplicados
            element.innerHTML = ''; // Limpiar antes de cargar
            element.insertAdjacentHTML('beforeend', data); // Cargar nuevo contenido
        })
        .catch(error => console.error('Error:', error));
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

    return valid;
}
