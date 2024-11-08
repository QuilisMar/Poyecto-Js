function sendEmail() {
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const email = document.getElementById('email').value;
    const fecha = document.getElementById('fecha-cumpleaños').value;
    const pais = document.getElementById('pais').value;

    fetch("https://criticine.netlify.app//.netlify/functions/sendEmail", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nombre,
            apellido,
            email,
            fecha,
            pais
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Email enviado exitosamente') {
            showNotification("¡Registro exitoso!", "success");
        } else {
            showNotification("Error al enviar el formulario", "error");
        }
    })
    .catch(error => {
        showNotification("Error al enviar el formulario: " + error.message, "error");
    });
}
