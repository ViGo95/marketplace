const marketSection = document.getElementById('marketSection')

async function getArticles() {

  try {
    const articleList = await axios.get('http://localhost:3000/api/articles')

    return articleList.data.body
  } catch(error) {
    console.error(error)
  }

}

const showArticles = (async () => {
  const articles = await getArticles()

  articles.forEach(article => {
    marketSection.innerHTML += `
      <a href="./article.html?id=${article.id}">
        <div class="flex items-center w-80 h-44 mx-auto border shadow-lg rounded-md">
          <section class="w-1/2 flex justify-center">
            <img src="" alt="${article.photo}">
          </section>
          <section class="flex flex-col justify-around w-52 h-36 border-l rounded-r-lg">
            <h3 class="text-center px-1">${article.name}</h3>
            <p class="ml-6">Precio: <span>${article.price}$</span></p>
            <p class="ml-6">Valoración: <span>${article.assessment}</span></p>
          </section>
        </div>
      </a>
    `
  });
})()