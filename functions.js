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
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById(elementId).innerHTML = xhr.responseText;
        }
    };
    xhr.send();
}
document.addEventListener("DOMContentLoaded", function() {
    loadContent('/Proyecto-Js/header.html', 'header');
    loadContent('/Proyecto-Js/footer.html', 'footer');
});

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

