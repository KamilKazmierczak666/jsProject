//Renderowanie produktów

const productsEl = document.querySelector(".products")
const cartItemsEl = document.querySelector(".cartItems")
const subTotalEl = document.querySelector('.subTotal')

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
                                <ul class="descriptionValues">
                                    <li class="price">${product.price}zł</li>
                                    <hr class="vl">
                                    <input type="number" value="1" id=${product.id} min="1" class="quantity">
                                    <hr class="vl">
                                    <li>
                                        <div class="btnContainer">
                                            <button class="standard add" onclick="moreLess('plus', ${product.id})">+</button>
                                            <button class="standard subtract" onclick="moreLess('minus', ${product.id})">-</button>
                                        </div>
                                    </li>
                                    <hr class="vl">
                                    <li>
                                        <div id="cartAmount" class="buy" onclick="addToCart(${product.id})">
                                        <img class="smallCart" src="./images/cart.png" alt="addToCart">
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
        `
    )
}

renderProducts()

//dodawanie ilosci

function moreLess (action, id) {
    let input = document.getElementById(id)
    let value = input.value

    if (action === "minus" && value > 1) {
        value--
    } else if (action === "plus") {
        value++
    }

    input.value = value
}

// dodawanie do koszyka
let cart = []

function addToCart(id) {
        let input = document.getElementById(id)
        //sprawdzanie czy produkt jest juz w koszyku
        if (cart.some((item) => item.id === id)) {
            changeQuantity("plus", id)
        } else {
            const item = products.find((product) => product.id === id)

            cart.push({
                ...item,
                quantity: input.value,
            })
        }
    input.value = 1
    updateCart()
}

//usuwanie z koszyka

function removeFromCart(id) {
    cart = cart.filter((item) => item.id !== id)

    updateCart();
}

//odswiezanie koszyka

function updateCart() {
    renderCartItems()
    renderTotal()
}

//kalkulowanie i renderowanie

function renderTotal() {
    let totalPrice = 0

    cart.forEach((item) => {
        totalPrice += item.price * item.quantity
    })

    subTotalEl.innerHTML = `Grand total : ${totalPrice.toFixed(2)}zł`
}

//zmiana ilosci w koszyku

function changeQuantity(action, id) {
    cart = cart.map((item) => {
        let quantity = item.quantity

        if(item.id === id){
            if(action === "minus" && quantity > 1) {
                quantity--
            }else if(action === "plus") {
                quantity++
            }
        }

        return {
            ...item,
            quantity,
        }
    })

    updateCart()
}

//renderowanie koszyka
function renderCartItems() {
        cartItemsEl.innerHTML = ""
    cart.forEach((item) => {
        cartItemsEl.innerHTML += `
                    <div class="ajustCart">
                    <h3 class="topText">${item.manufacterer}</h3>
                
                    <div class="cartProducts">
                        <ul class="cartList">
                            <li><input type="radio" name="product" id="product_1" value="produkt1" /></li>
                            <li>${item.name}</li>
                            <li>${item.price}</li>
                            <li class="quantity">${item.quantity}</li>
                            <li>
                                <div class="btnContainer">
                                    <button class="standard add" onclick="changeQuantity('plus', ${item.id})">+</button>
                                    <button class="standard subtract" onclick="changeQuantity('minus', ${item.id})">-</button>
                                </div>
                            </li>
                            <li>
                                <img class="remove" src="./images/delete.png" alt="removeItem"  onclick="removeFromCart(${item.id})">
                            </li>
                        </ul>
                    </div>
                
                </div>
        `
    })
}
