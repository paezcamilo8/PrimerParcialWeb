// Función para obtener el listado de carritos del usuario
function fetchUserCarts() {
    fetch('https://fakestoreapi.com/carts/user/2')
        .then(res => res.json())
        .then(carts => {
            const carritoList = document.getElementById('carrito-list');
            carritoList.innerHTML = '<h2>Carritos del Usuario</h2>';
            carts.forEach(cart => {
                const cartItem = document.createElement('div');
                cartItem.classList.add('carrito-item');
                cartItem.innerHTML = `
                    <div>
                        <strong>Número de carrito:</strong> ${cart.id} <br>
                        <strong>Fecha Solicitud:</strong> ${new Date(cart.date).toLocaleDateString()}
                    </div>
                    <button onclick="viewCart(${cart.id})">Ver</button>
                `;
                carritoList.appendChild(cartItem);
            });
        })
        .catch(error => console.error('Error al obtener los carritos:', error));
}

// Función para ver los detalles de un carrito específico
function viewCart(cartId) {
    fetch(`https://fakestoreapi.com/carts/${cartId}`)
        .then(res => res.json())
        .then(cart => {
            const carritoDetalles = document.getElementById('carrito-detalles');
            carritoDetalles.innerHTML = '<h2>Detalles del Carrito</h2>';
            carritoDetalles.innerHTML += `
                <p><strong>Número de Carrito:</strong> ${cart.id}</p>
                <p><strong>Fecha de Solicitud:</strong> ${new Date(cart.date).toLocaleDateString()}</p>
            `;

            cart.products.forEach(item => {
                fetch(`https://fakestoreapi.com/products/${item.productId}`)
                    .then(res => res.json())
                    .then(product => {
                        const productElement = document.createElement('div');
                        productElement.classList.add('product');
                        productElement.innerHTML = `
                            <img src="${product.image}" alt="${product.title}">
                            <div class="item-details">
                                <h2>${product.title}</h2>
                                <p>Precio: $${product.price}</p>
                                <p>Cantidad: ${item.quantity}</p>
                            </div>
                        `;
                        carritoDetalles.appendChild(productElement);
                    })
                    .catch(error => console.error('Error al obtener los productos del carrito:', error));
            });
        })
        .catch(error => console.error('Error al obtener los detalles del carrito:', error));
}

// Función para seguir comprando
function continueShopping() {
    window.location.href = 'productos.html'; // Redirigir a productos
}

// Llamar a la función al cargar la página
fetchUserCarts();
