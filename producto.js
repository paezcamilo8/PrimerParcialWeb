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
    // Aquí puedes implementar la lógica para agregar el producto al carrito
    alert('Producto agregado al carrito');
}

getProductDetails();
