function fetchUserCarts() {
    fetch('https://fakestoreapi.com/carts/user/2')
        .then(res => res.json())
        .then(carts => {
            const carritoDiv = document.getElementById('carrito');
            carritoDiv.innerHTML = '';

            // Asumiendo que solo tomamos el primer carrito
            const cart = carts[0];
            const products = cart.products;
            let totalAmount = 0;

            products.forEach(item => {
                fetch(`https://fakestoreapi.com/products/${item.productId}`)
                    .then(res => res.json())
                    .then(product => {
                        const cartItem = document.createElement('div');
                        cartItem.classList.add('carrito-item');
                        cartItem.innerHTML = `
                            <img src="${product.image}" alt="${product.title}">
                            <div class="item-details">
                                <h2>${product.title}</h2>
                                <p>Precio: $${product.price}</p>
                                <p>Cantidad: ${item.quantity}</p>
                            </div>
                        `;
                        carritoDiv.appendChild(cartItem);

                        totalAmount += product.price * item.quantity;

                        // Mostrar el total después de cargar todos los productos
                        if (carritoDiv.childElementCount === products.length) {
                            const totalDiv = document.createElement('div');
                            totalDiv.classList.add('total-amount');
                            totalDiv.innerHTML = `<h3>Total: $${totalAmount.toFixed(2)}</h3>`;
                            carritoDiv.appendChild(totalDiv);
                        }
                    })
                    .catch(error => console.error('Error al obtener el producto:', error));
            });
        })
        .catch(error => console.error('Error al obtener los carritos:', error));
}

// Llamar a la función al cargar la página
fetchUserCarts();
