const productList = document.getElementById('product-list');
const searchInput = document.getElementById('search');
const categorySelect = document.getElementById('category');

const fetchProducts = async () => {
  const search = searchInput.value;
  const category = categorySelect.value;

  const response = await fetch(
    `http://localhost:3000/products?search=${search}&category=${category}`
  );
  const products = await response.json();

  renderProducts(products);
};

const renderProducts = (products) => {
  productList.innerHTML = '';

  if (products.length === 0) {
    productList.innerHTML = '<p>No products found</p>';
    return;
  }

  products.forEach((product) => {
    const productDiv = document.createElement('div');
    productDiv.className = 'product';
    productDiv.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>Price: $${product.price}</p>
      <p>Category: ${product.category}</p>
    `;
    productList.appendChild(productDiv);
  });
};

// Fetch initial products
fetchProducts();

// Add event listeners for search and filter
searchInput.addEventListener('input', fetchProducts);
categorySelect.addEventListener('change', fetchProducts);
