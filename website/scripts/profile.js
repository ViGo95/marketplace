const nameCard = document.getElementById('name')
const usernameCard = document.getElementById('username')
const emailCard = document.getElementById('email')
const articleList = document.getElementById('articleList')
const logout = document.getElementById('logout')
const editSection = document.getElementById('editSection')
const changeEdit = document.getElementById('changeEdit')

const userID = sessionStorage.getItem('userID')
const username = sessionStorage.getItem('username')
const name = sessionStorage.getItem('name')
const lastname = sessionStorage.getItem('lastname')
const email = sessionStorage.getItem('email')
const token = sessionStorage.getItem('token')

const articles = []

function setInfo() {

  nameCard.innerText = `${name} ${lastname}`
  usernameCard.innerText = username
  emailCard.innerText = email

  fillCart()
  fillBillList()

}

setInfo()

async function getArticles() {
  let info

  try {
    info = await axios.get('http://localhost:3000/api/users/cart/' + userID, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    const articlesInfo = info.data.body

    return articlesInfo
  } catch {

  }
}

async function fillCart() {

  const articlesInfo = await getArticles()

  if (Array.isArray(articlesInfo)) {
    const loading = document.getElementById('loadArticles')

    articlesInfo.forEach(article => {
      articles.push(article)

      if (loading) {
        loading.remove()
      }

      articleList.innerHTML += `
        <div class="grid grid-cols-3 grid-rows-2 border-b border-purple-300 h-24">
          <div class="col-span-1 row-span-2 ">
            <img src="" alt="Foto del articulo">
          </div>

          <a href="./article.html?id=${article.id}" class="col-span-2 row-span-1 mt-1 px-3 border-l border-purple-300">
            ${article.name}
          </a>

          <div class="col-span-1 row-span-1 mb-1 px-3 flex flex-col justify-between border-l text-sm border-purple-300">
            <p>
              <span>${article.price}$</span>
            </p>
            <p>
              Cantidad: <span>${article.quantity}</span>
            </p>
          </div>

          <button type="button" onclick="removeArticle('${article.cartID}', '${article.id}')" class="bg-red-500 w-16 h-8 ml-8">
            Eliminar
          </button>
        </div>
      `
    })

  } else {

    articleList.innerHTML = `
      <div class="mx-auto my-auto text-lg">
        ${articlesInfo}
      </div>
    `

  }
}

async function getBills() {

  try {
    const info = await axios.get('http://localhost:3000/api/users/bills/' + userID, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    const billsInfo = info.data.body

    return billsInfo
  } catch {

  }

}

async function fillBillList() {
  const loading = document.getElementById('loadBills')
  const billList = document.getElementById('billList')
  const bills = await getBills()
  
  if (Array.isArray(bills)) {

    bills.forEach(bill => {

      if (loading) {
        loading.remove()
      }

      const date = new Date(bill.date).toDateString()

      billList.innerHTML += `
        <div class="h-16 flex flex-col justify-evenly items-center border-b ">
          <h3>${date} </h3>
          <h3>Total: ${bill.amount}$</h3>
        </div>
      `
    })

  } else {
    billList.innerHTML = `
      <h3 id="loadBills" class="mx-auto my-auto px-2">
        No se ha realizado ningun pedido...
      </h3>
    `
  }
}

if (changeEdit) {
  changeEdit.onclick = () => {
    editSection.innerHTML = `
      <form action="" class="grid grid-cols-3 grid-rows-2 gap-10 w-full h-full p-10">
        <input id="nameEdited" type="text" placeholder="Nombre de usuario" class="col-span-1 row-span-1 w-full h-10 pl-3 border-b border-gray-500 rounded-none">
        <input id="emailEdited" type="email" placeholder="Correo electronico" class="col-span-1 row-span-1 w-full h-10 pl-3 border-b border-gray-500 rounded-none">
        <input id="passwordEdited" type="password" placeholder="Contraseña" class="col-span-1 row-span-1 w-full h-10 pl-3 border-b border-gray-500 rounded-none">
        <button id="editBtn" onclick="editInfo()" type="button" class="col-span-3 bg-orange-400 text-gray-200 rounded-md">
          Modificar
        </button>
      </form>`
  }
}

async function editInfo() {

  let usernameEdited = document.getElementById('usernameEdited')
  let emailEdited = document.getElementById('emailEdited')
  let passwordEdited = document.getElementById('passwordEdited')

  if (usernameEdited) {
    usernameEdited = usernameEdited.value
  } else {
    usernameEdited = ''
  }

  if (emailEdited) {
    emailEdited = emailEdited.value
  } else {
    emailEdited = ''
  }

  if (passwordEdited) {
    passwordEdited = passwordEdited.value
  } else {
    passwordEdited = ''
  }

  try {
    const result = await axios({
      method: 'put',
      url: 'http://localhost:3000/api/users',
      data: {
        id: userID,
        username: usernameEdited,
        email: emailEdited,
        password: passwordEdited
      },
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    editBtn.innerText = 'Inicia sesión de nuevo para ver los cambios :)'

    setTimeout(() => {
      window.location = './index.html'
    }, 4000)

  } catch(error) {
    console.error(error)
  }
}

logout.onclick = () => {
  sessionStorage.removeItem('token')
}

async function removeArticle(cartID, articleID) {
  
  try {
    await axios({
      method: 'delete',
      url: 'http://localhost:3000/api/users/cart/' + userID,
      data: {
        itemID: cartID,
      },
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  } catch(error) {
    console.error(error)
  }

  try {
    const articleinfo = await axios.get('http://localhost:3000/api/articles/' + articleID)
    const article = articleinfo.data.body[0]

    await axios({
      method: 'put',
      url: 'http://localhost:3000/api/articles',
      data: {
        id: articleID,
        quantity: article.quantity + 1
      },
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  } catch(error) {
    console.log(error)
  }

  location.reload()
}

async function checkout() {

  try {
    await axios({
      method: 'post',
      url: 'http://localhost:3000/api/users/bills/' + userID,
      data: articles,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  } catch(error) {
    console.error(error)
  }

  try {
    await axios({
      method: 'delete',
      url: 'http://localhost:3000/api/users/cart/' + userID,
      data: {
        all: true,
      },
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  } catch(error) {
    console.error(error)
  }

  location.reload()
}