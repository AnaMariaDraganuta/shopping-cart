
const productForm = document.getElementById('productForm');
const cartList = document.getElementById('cartList');
const productNameInput = document.getElementById('productName');
const productQuantityInput = document.getElementById('productQuantity');


let cart = [];

function addProduct(name, quantity) {
    const product = { name, quantity };
    cart.push(product);
    updateCart();
}


function updateCart() {

    cartList.innerHTML = '';


    cart.forEach((product, index) => {
        const li = document.createElement('li');
        li.textContent = `${product.name} - ${product.quantity}`;

        const updateBtn = document.createElement('button');
        updateBtn.textContent = 'Modifica';
        updateBtn.addEventListener('click', () => {
            const newQuantity = prompt('Introdu noua cantitate:', product.quantity);
            if (newQuantity && !isNaN(newQuantity) && Number(newQuantity) > 0) {
                product.quantity = newQuantity;
                updateCart();
                saveCart();
            } else {
                alert('Cantitatea trebuie sa fie un numar pozitiv.');
            }
        });

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Sterge';
        removeBtn.addEventListener('click', () => {
            cart.splice(index, 1);
            updateCart();
            saveCart();
        });

       
        li.appendChild(updateBtn);
        li.appendChild(removeBtn);

        
        cartList.appendChild(li);
    });
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
        updateCart();
    }
}


productForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const productName = productNameInput.value.trim();
    const productQuantity = productQuantityInput.value; 

   
    if (productName && productQuantity && !isNaN(productQuantity) && Number(productQuantity) > 0) {
        addProduct(productName, productQuantity);
        saveCart();
        productNameInput.value = '';
        productQuantityInput.value = '';
    } else {
        alert('Te rog, completeaza toate campurile corect.');
    }
});

loadCart();
