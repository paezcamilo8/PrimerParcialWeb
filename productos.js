let allProducts = [];

// Función para obtener y mostrar todos los productos
function fetchProducts() {
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(products => {
            allProducts = products; // Guardar todos los productos para filtros
            displayProducts(allProducts);
        })
        .catch(error => console.error('Error al obtener los productos:', error));
}

// Función para mostrar los productos en la página
function displayProducts(products) {
    const productDiv = document.getElementById('productos');
    productDiv.innerHTML = '';
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h2>${product.title}</h2>
            <p>Precio: $${product.price}</p>
            <button onclick="viewProduct(${product.id})">Ver Producto</button>
        `;
        productDiv.appendChild(productElement);
    });
}

// Función para filtrar productos por categoría
function filterByCategory(category) {
    fetch(`https://fakestoreapi.com/products/category/${category}`)
        .then(res => res.json())
        .then(products => {
            displayProducts(products);
        })
        .catch(error => console.error('Error al obtener los productos de la categoría:', error));
}

// Función para filtrar productos por nombre usando la barra de búsqueda
function filterProductsByName() {
    const input = document.getElementById('filter-input').value.toLowerCase();
    const filteredProducts = allProducts.filter(product => 
        product.title.toLowerCase().includes(input)
    );
    displayProducts(filteredProducts);
}

// Función para restablecer el filtro y mostrar todos los productos
function resetFilter() {
    displayProducts(allProducts);
}

// Función para ver el detalle de un producto
function viewProduct(productId) {
    window.location.href = `producto.html?id=${productId}`;
}

// Función para ir al carrito
function goToCart() {
    window.location.href = 'carrito.html';
}

// Función para cerrar sesión (volver al login)
function logout() {
    window.location.href = 'login.html';
}

// Llamada inicial para obtener todos los productos
fetchProducts();
