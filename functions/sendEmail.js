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
        alert("¡Registro exitoso!"); // Muestra un mensaje de éxito
    }, function(error) {
        console.log('FAILED...', error); // Muestra el error en la consola
        alert("Error al enviar el formulario: " + JSON.stringify(error)); // Muestra un mensaje de error
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
