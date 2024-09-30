function fetchProducts() {
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(products => {
            const productDiv = document.getElementById('productos');
            productDiv.innerHTML = '';
            products.forEach(product => {
                const productElement = document.createElement('div');
                productElement.classList.add('product');
                productElement.innerHTML = `
                    <h2>${product.title}</h2>
                    <p>Precio: $${product.price}</p>
                    <button onclick="viewProduct(${product.id})">Ver Producto</button>
                `;
                productDiv.appendChild(productElement);
            });
        })
        .catch(error => console.error('Error al obtener los productos:', error));
}

function viewProduct(productId) {
    window.location.href = `producto.html?id=${productId}`;
}

fetchProducts();
