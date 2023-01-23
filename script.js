






//Renderowanie produktów

const productsEl = document.querySelector(".products")

function renderProducts() {
    products.forEach( (product) =>
        productsEl.innerHTML += ` 
                    <div class="items">
                    <img class="image" src="https://picsum.photos/100" alt="${product.name}">
                    <div class="textBox">
                        <h5 class="info">${product.name}</h5>
                        <h5 class="info">${product.manufacterer}</h5>
                    </div>
                    <div>
                        <p class="descriptionText">${product.description}</p>
                    </div>
                    <hr class="seperate">
                    <div class="footer">
                        <p class="price">${product.price}</p>
                        <hr class="vl">
                        <p class="quantity">  </p>
                        <hr class="vl">
                        <div class="btnContainer">
                            <button class="standard add">+</button>
                            <button class="standard subtract">-</button>
                        </div>
                        <hr class="vl">
                        <a href="#">
                        <img class="smallCart" src="./images/cart.png" alt="addToCart">
                        </a>
                    </div>
                </div>
        `
    )
}

renderProducts()
