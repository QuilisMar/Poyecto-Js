
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
