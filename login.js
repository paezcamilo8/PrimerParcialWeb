document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.token) {
            window.location.href = 'productos.html'; // Redirigir a la página de productos
        } else {
            document.getElementById('loginMessage').textContent = "Usuario o contraseña incorrectos";
        }
    })
    .catch(error => console.error('Error en la solicitud:', error));
});
