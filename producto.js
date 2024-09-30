function getProductDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    fetch(`https://fakestoreapi.com/products/${productId}`)
        .then(res => res.json())
        .then(product => {
            document.getElementById('productImage').src = product.image;
            document.getElementById('productImage').alt = product.title;
            document.getElementById('productTitle').textContent = product.title;
            document.getElementById('productDescription').textContent = product.description;
            document.getElementById('productPrice').textContent = product.price;
        })
        .catch(error => console.error('Error al obtener el producto:', error));
}

function addToCart() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const quantity = 1; // Cantidad predeterminada

    // Agregar el producto al carrito (lógica simplificada)
    fetch('https://fakestoreapi.com/carts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: 2, // ID de usuario fijo
            products: [{ productId: parseInt(productId), quantity: quantity }]
        })
    })
    .then(res => res.json())
    .then(() => {
        alert('Producto agregado al carrito');
        window.location.href = 'carrito.html'; // Redirigir al carrito después de agregar
    })
    .catch(error => console.error('Error al agregar el producto al carrito:', error));
}

getProductDetails();
