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