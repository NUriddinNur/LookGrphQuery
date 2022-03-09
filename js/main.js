const customerList = document.querySelector('.customers-list')
const foodsSElect = document.querySelector('#foodsSelect')
const userHeader = document.querySelector('#userHeader')
const clientId = document.querySelector('#clientId')
const ordersList = document.querySelector('.orders-list')
const userNameInput = document.querySelector('#usernameInput')
const telephoneInput = document.querySelector('#telephoneInput')
const userAdd = document.querySelector('#btn')
const foodsForm = document.querySelector('#addFood')
const foodsCount = document.querySelector('#foodsCount')

async function renderUsers() {
    const {users} = await request(USERS_QUERY)
    
    customerList.innerHTML = null
    for(let user of users) {
        const [li, span, a] = creatElements('li', 'span', 'a')

        li.classList.add('customer-item')
        span.classList.add('customer-name')
        a.classList.add('customer-phone')

        span.textContent = user['username']
        a.textContent = "+"+user['contact']
        a.href = '+' + user['contact']

        li.append(span, a)
        customerList.append(li)

        li.onclick = () => {
            userHeader.innerHTML = user.username
            clientId.innerHTML = user.userId

            window.localStorage.setItem('userId', user.userId)
            window.localStorage.setItem('userNmae', user.username)

            renderOrders(user.userId)
        }
    }
}

async function renderFods() {
    const {foods} = await request(FOODS_QUERY)

    for (let food of foods) {
        const [option] = creatElements("option")

        option.value = food.foodId
        option.textContent = food.foodName

        foodsSElect.append(option)
    }
}

async function renderOrders(userId) {
    let {orders} = await request(ORDERS_QUERY, {userId})
    orders = orders.reverse()

    ordersList.innerHTML =  null
    for(let order of orders) {
        const [li, img, div, span1, span2] = creatElements("li", "img", "div", "span", "span")

        li.classList.add('order-item')
        span1.classList.add("order-name")
        span2.classList.add("order-count")
        img.src = API_IMG + order.food.foodImg

        span1.textContent = order.food.foodName
        span2.textContent = order.count

        div.append(span1, span2)
        li.append(img, div)
        ordersList.append(li)

    }
}

userAdd.onclick = async (event) => {
    event.preventDefault()

    let username = userNameInput.value.trim()
    let contact = telephoneInput.value.trim()

    if(!username || !contact) return (userNameInput.value = '', telephoneInput.value = '')
    if(!(/^998[389][012345789][0-9]{7}$/).test(contact)) return alert('Invalid number')

    const respons = await request(ADD_USER, {username, contact})

    userNameInput.value = ''
    telephoneInput.value = ''

    if(respons) return await renderUsers()
}

foodsForm.onclick = async (event) => {
    event.preventDefault()

    if(
        !foodsCount.value ||
        !clientId.textContent ||
        (foodsCount.value > 10 || foodsCount.value <= 0) 
    ) return

    const response = await request (ADD_ORDER, {
        foodId: +foodsSElect.value,
        userId: +clientId.textContent,
        count: +foodsCount.value
    })

    foodsCount.value = ''
    foodsSElect.value = 1

    if(response) return await renderOrders(clientId.textContent)
}

const userId = window.localStorage.getItem('userId')
const username = window.localStorage.getItem('username')

userId && (clientId.textContent = userId)
username && (userHeader.textContent = username)

renderUsers()
renderFods()
renderOrders(userId)