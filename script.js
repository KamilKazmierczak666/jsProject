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
                        <p class="price">${product.price}zł</p>
                        <hr class="vl">
                        <p class="quantity" id=${product.id}> 0 </p>
                        <hr class="vl">
                        <div class="btnContainer">
                            <button class="standard add" onclick='increment(${product.id})'>+</button>
                            <button class="standard subtract" onclick='decrement(${product.id})'>-</button>
                        </div>
                        <hr class="vl">
                        <div id="cartAmount" class="buy" onclick="addToCart(${product.id})">
                        <img class="smallCart" src="./images/cart.png" alt="addToCart">
                        </div>
                    </div>
                </div>
        `
    )
}

renderProducts()

//dodawanie ilosci
let numOfProducts = []

let increment = (id) => {
    let search = numOfProducts.find((x) => x.id === id)

    if(search === undefined) {
        numOfProducts.push({
            id: id,
            item: 1,
        })
    } else {
        search.item += 1
    }

    updateShop(id)
}

let decrement = (id) => {
    let search = numOfProducts.find((x) => x.id === id)

    if(search.item === 0) return
    else {
        search.item -= 1
    }

    updateShop(id)
}

let updateShop = (id) => {
    let search = numOfProducts.find((x) => x.id === id)
    console.log(search.item);
    document.getElementById(id).innerHTML = search.item
}


// dodawanie do koszyka
let cart = []


function addToCart(id) {
        //sprawdzanie czy produkt jest juz w koszyku
        if (cart.some((item) => item.id === id)) {
            changeQuantity("plus", id)
        } else {
            const item = products.find((product) => product.id === id)

            cart.push({
                ...item,
                quantity: 1,
            })
        }
    
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
                <form>
                    <fieldset>
                    <legend class="topText">${item.manufacterer}</legend>

                    <div class="cartProducts">
                        <input type="radio" name="product" id="product_1" value="produkt1" />
                        <label for="product_1">${item.name}</label>
                        <p>${item.price}</p>
                        <p class="quantity">${item.quantity}</p>
                        <div class="btnContainer">
                            <button class="standard add" onclick="changeQuantity('plus', ${item.id})">+</button>
                            <button class="standard subtract" onclick="changeQuantity('minus', ${item.id})">-</button>
                        </div>
                        <img class="remove" src="./images/delete.png" alt="removeItem"  onclick="removeFromCart(${item.id})">
                    </div>

                    </fieldset>
                </form>
        `
    })
}
