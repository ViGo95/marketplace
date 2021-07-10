const card = document.getElementById('card')

const url = new URL(window.location.href)
const articleID = url.searchParams.get('id')

async function getArticle() {
  const articleInfo = await axios.get('http://localhost:3000/api/articles/' + articleID)

  return articleInfo.data.body[0]
}

const showArticle = async () => {
  const article = await getArticle()

  card.innerHTML = `
    <div class="w-72 h-full flex">
      <div class="border border-teal-400 absolute -ml-12 -mt-12 w-76 h-80 rounded-xl">
        <img src="" alt="${article.photo}">
      </div>

      <div class="self-end flex justify-between items-center w-full h-16 mb-5">
        <h4 class="bg-orange-400 w-48 h-10 pt-2 pl-12 rounded-r-full shadow-lg text-lg text-gray-200">
          Precio: <span class=""> ${article.price}$ </span>
        </h4>

        <button id="addBtn" type="button" onclick="addCart('${article.quantity}')" class="bg-blue-500 h-12 w-12 mr-4 rounded-full shadow-lg text-gray-300">
          Add
        </button>
      </div>
    </div>
    <div class="self-center grid grid-cols-2 grid-rows-4 gap-4 w-88 h-84 px-2 border-l border-gray-400">
      <div class="col-span-2">
        <h2 class="text-2xl text-center">
          ${article.name}
        </h2>
      </div>
      <div class="col-span-2 row-span-2 px-3">
        <p>
          ${article.description}
        </p>
      </div>
      <div class="border border-blue-500 mx-1 p-2 text-center text-lg rounded-md">
        <h4>
          Valoración
        </h4>
        <p class="text-orange-500 text-2xl">${article.assessment}</p>
      </div>
      <div class="bg-blue-500 mx-1 p-2 text-center text-gray-200 text-lg rounded-md">
        <h4>
          Disponibilidad
        </h4>
        <p>${article.quantity}</p>
      </div>
    </div>
  `
}

showArticle()

async function addCart(quantity) {
  const userID = sessionStorage.getItem('userID')
  const token = sessionStorage.getItem('token')

  try {
    await axios({
      method: 'post',
      url: 'http://localhost:3000/api/users/cart/' + userID,
      data: {
        articlesID: articleID,
      },
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  } catch(error) {
    console.error(error)
  }

  try {
    await axios({
      method: 'put',
      url: 'http://localhost:3000/api/articles',
      data: {
        id: articleID,
        quantity: quantity - 1
      },
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  } catch(error) {
    console.error(error)
  }

  const addBtn = document.getElementById('addBtn')

  addBtn.innerText = 'Listo'

  setTimeout(() => {
    showArticle()
  }, 1000)
}



