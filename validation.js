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