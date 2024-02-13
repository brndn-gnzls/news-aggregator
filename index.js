const cards = document.querySelector(".cards")
const category = document.querySelector(".category")
const categorySpan = document.querySelectorAll(".category span")

const defaultImage = "./images/default.jpg"

const baseUrl = "https://newsapi.org/v2"
const API_KEY = "&apiKey=93e8c82510db4620a481daba52b43b94"
const newsA = "/top-headlines?country=us"

async function dataRequest(url) {

    try {
        const response = await fetch(baseUrl + url + API_KEY)
        const json = response.json()
        return json
    } catch (e) {
        console.log(e)
    }

}

function urlRequest (url) {
    dataRequest(url)
        .then(data => {
            data.articles.forEach(item => {
                cards.innerHTML += `<div class="card">
                                        <div class="image">
                                            <img src="${item.urlToImage ? item.urlToImage : defaultImage}" alt="Default News Image">
                                        </div>
                                        <div class="information">
                                            <div>
                                                <p class="title">${item.title}</p>
                                                <p class="description">${item.description}</p>
                                                <p class="time">
                                                    <span>${item.publishedAt.replace("Z", "").split("T")[1]}</span>
                                                    <span>${item.publishedAt.replace("Z", "").split("T")[0]}</span>
                                                </p>
                                            </div>
                                            <div class="other">
                                                <span class="source">${item.source.name.toLowerCase()}</span>
                                                <a href="${item.url}" class="url" target="_blank">Read Article <i class="bi bi-arrow-right"></i></a>
                                            </div>
                                        </div>
                                    </div>`
                                }                   
                            )
                }
        )
}

category.addEventListener("click", event => {
    if(event.target.tagName === "SPAN") {
        cards.innerHTML = ""
        urlRequest(event.target.dataset.id)
        categorySpan.forEach(item => item.classList.remove("active"))
        event.target.classList.add("active")
    }
})

urlRequest(newsA)