// open list items @ media 767px

function openNavList(){
	let navlist = document.querySelector('nav');
	navlist.classList.toggle("show");
}

// general variables in functions

let allproduct =[]
let activeImage;
let featureProduct;
let totalOfAllProductInCart = 0;
let shipping = 35;
let activeProductDetails = document.querySelector('.contentOfPage')

// product in webpage
function addproducts(fileName, locationOfProducts){
	fetch('product.json')
			.then(response => response.json())
			.then(data => {
				const products = document.querySelector(locationOfProducts);
				allproduct =data;
				data.forEach( product => {
					if(product.section === fileName){
						products.innerHTML += `
							<div class="box">
								<div class="image">
									<img src="${product.img}">
								</div>
								<div class="stars">
									<i class="fas fa-star"></i>
									<i class="fas fa-star"></i>
									<i class="fas fa-star"></i>
									<i class="fas fa-star"></i>
									<i class="fas fa-star"></i>
								</div>
								<p onclick="openProduct(${product.id})" product-id="${product.id}">${product.name}</p>
								<span>$${product.price}</span>
								<button onclick="addToCart(${product.id})">Add Cart</button>
							</div>`
					}
				})
			})
}
addproducts('shop', '.shop .content');
addproducts('Featured', '.featured .content');
addproducts('Dresses', '.dresses-jumpsuits .content');
addproducts('Shoes', '.shoes .content');

// open details of product
function openProduct(id) {
    activeProductDetails.innerHTML =`
            <!-- ======================start product====================== -->
            <div class="product">
                <div class="container">
                    <div class="images">
                        <img src="${ allproduct[id].img}" class="active">
                        <div class="color-product">
                            <img src="${ allproduct[id].productColors[0]}" onclick="changeColor(this.src)" id ="one">
                            <img src="${ allproduct[id].productColors[1]}" onclick="changeColor(this.src)" id ="two">
                            <img src="${ allproduct[id].productColors[2]}" onclick="changeColor(this.src)" id ="three">
                            <img src="${ allproduct[id].productColors[3]}" onclick="changeColor(this.src)" id ="four">
                        </div>
                    </div>
                    <div class="info">
                        <span>${ allproduct[id].category}</span>
                        <h3>${ allproduct[id].name}</h3>
                        <span class="price">${allproduct[id].price}</span>
                        <select>
                            <option>Select Size</option>
                            <option>XL</option>
                            <option>XXL</option>
                            <option>Small</option>
                            <option>Large</option>
                        </select>
                        <input type="number" value="1">
                        <button onclick="addToCart(${ allproduct[id].id})">Add to Cart</button>
                        <h4>Product Details</h4>
                        <p>${ allproduct[id].ProductDetails}</p>
                    </div>
                </div>
            </div>
            <!-- ======================end product====================== -->
            <!-- ======================start other products====================== -->
            <div class="products our-product" id="product">
                <div class="container">
                    <div class="header">
                        <h3>Related Products</h3>
                    </div>
                    <div class="content">
                
                    </div>
                </div>
            </div>
            <!-- ======================end other products====================== -->
	`; 

	activeImage = document.querySelector('.product .images .active')

	setTimeout(() => {
		featureProduct = document.querySelector('#product .container .content')
		fetch('product.json')
				.then(response => response.json())
				.then(data => {
					featureProduct
					allproduct =data;
					data.forEach( product => {
						if(product.section === "Featured"){
							featureProduct.innerHTML += `
								<div class="box">
									<div class="image">
										<img src="${product.img}">
									</div>
									<div class="stars">
										<i class="fas fa-star"></i>
										<i class="fas fa-star"></i>
										<i class="fas fa-star"></i>
										<i class="fas fa-star"></i>
										<i class="fas fa-star"></i>
									</div>
									<p onclick="openProduct(${product.id})" product-id="${product.id}">${product.name}</p>
									<span>$${product.price}</span>
									<button onclick="addToCart(${product.id})">Add Cart</button>
								</div>`
						}
					})
				})
	}, 100);
}

//  change color of product
 
function changeColor(newImage){
	activeImage.src = newImage
}

// add product to cart
function addToCart(id) {
    fetch('cart.html')
        .then(response => response.text())
        .then(data => {

            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
            const elementInCart = doc.querySelector('.cart table tbody');
            console.log(elementInCart);

            elementInCart.innerHTML += `
               <tr id="product-${allproduct[id].id}">
                    <td>
                        <i class="fa-regular fa-trash-can" data-id="${allproduct[id].id}"></i>
                    </td>
                    <td>
                        <img src="${allproduct[id].img}">
                    </td>
                    <td>
                        <h4>${allproduct[id].name}</h4>
                    </td>
                    <td>
                        <h4>$${allproduct[id].price}</h4>
                    </td>
                    <td>
                        <input type="number" value="1" min="1" class="amount-input" data-id="${allproduct[id].id}">
                    </td>
                    <td>
                        <h4 class="total-price">$${allproduct[id].price}</h4>
                    </td>
                 </tr>`;

            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push(allproduct[id]);

            localStorage.setItem('cart', JSON.stringify(cart));

        })
        .catch(console.log('error'));
}

function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const tbody = document.querySelector('.cart table tbody');

    cart.forEach(product => {
        tbody.innerHTML += `
            <tr id="product-${product.id}">
                <td>
                    <i class="fa-regular fa-trash-can" onclick="deleteFromCart(${product.id})"></i>
                </td>
                <td>
                    <img src="${product.img}">
                </td>
                <td>
                    <h4>${product.name}</h4>
                </td>
                <td>
                    <h4>$${product.price}</h4>
                </td>
                <td>
                    <input type="number" value="1" class="amount-input" data-id="${product.id}">
                </td>
                <td>
                    <h4 class="total-price">$${product.price}</h4>
                </td>
            </tr>`;
    });

    document.querySelectorAll('.amount-input').forEach(input => {
        input.addEventListener('change', (e) => {
            const id = parseInt(e.target.dataset.id);
            updateTotalPrice(id);
        });
    });
}
// delete items from the cart
function deleteFromCart(id) {

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    cart = cart.filter(product => product.id !== id);

    localStorage.setItem('cart', JSON.stringify(cart));
    

    const row = document.getElementById(`product-${id}`);

        row.remove(); 
}

function updateTotalPrice(id) {
    const input = document.querySelector(`.amount-input[data-id="${id}"]`);
    const price = allproduct[id].price;
    const totalPriceElement = document.querySelector(`#product-${id} .total-price`);
    totalPriceElement.innerText = `$${(input.value * price).toFixed(2)}`;
	
	totalOfAllProducts()

}

function totalOfAllProducts() {
    totalOfAllProductInCart = 0;

    const inputs = document.querySelectorAll('.amount-input');
    
    inputs.forEach(input => {
        const id = parseInt(input.dataset.id);
        const priceOfProduct = allproduct[id].price;
        totalOfAllProductInCart += input.value * priceOfProduct;
    });

    document.querySelector('.cart-total .subtotal').innerHTML =`${totalOfAllProductInCart}`;
    document.querySelector('.cart-total .shipping').innerHTML =`${shipping}`;
    document.querySelector('.cart-total .total').innerHTML =`${(totalOfAllProductInCart + shipping).toFixed(2)}`;
}
window.onload = loadCart;