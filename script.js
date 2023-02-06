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
                                <h5 class="info" id="manufacterer">${product.manufacterer}</h5>
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

    if (action === "plus") {
        value++
    } else if (action === "minus" && value > 1) {
        value--
    }

    input.value = value
}

// dodawanie do koszyka
let cart = []
let subCarts = []

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

//segregacja

function createSubCarts() {
    subCarts = Object.entries(
        cart.reduce((acc, product) => {
            if(acc[product.manufacterer]) {
                acc[product.manufacterer].push(product)
            } else {
                acc[product.manufacterer] = [product]
            }
    
            return acc;
        }, {})
    );
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

//total manufacterer

// function manufactererTotal(manTotal) {
//     let manArray = cart.filter((x) => x.manufacterer===manTotal)
//     let manQty = manArray.map((x) => x.manTotal).reduce((x, y) => x + y, 0)
//     let totalPrice = document.getElementById("manTotal" + manufacterer)

//     totalPrice.innerHTML = `Total : ${manQty}`

// }

// function manufactererTotal() {
//     let manTotal = 0

//     cart.forEach((manufacterer) => {
//         manTotal += manufacterer.price * manufacterer.quantity
//     })
// }
//nie wiem :(


//renderowanie koszyka
function renderCartItems() {
        cartItemsEl.innerHTML = ""
        createSubCarts()
        let cartItem = ""
        subCarts.forEach((group) => {
            cartItem += `
            <div class="ajustCart">
                <h3 class="topText">${group[0]}<span id="manTotal${manufacterer}"></span></h3>
            `
        
            group[1].forEach((item) => {
                cartItem += `
                    
                
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

    cartItemsEl.innerHTML = cartItem

    })          
}
