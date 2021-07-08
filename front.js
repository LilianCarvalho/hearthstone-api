const cards = document.getElementById('cards')
const cardsQ = document.getElementById('cardsQ')
const cardsF = document.getElementById('cardsF')
const cardsT = document.getElementById('cardsT')
const cardsC = document.getElementById('cardsC')
const numbersOfCards = document.getElementById('numbersOfCards')
let cardsData = []

const fillCards = (data = cardsData) => {
    if (data) {
        cards.innerHTML = ``
        const length = Number(numbersOfCards.value)
        const filteredData = data.slice(0, length)
        filteredData.map((item) => {
            if (item.img) {
                const boxClass = `
                <div class="card">
                        <img class='card-img' src='${item.img}'>
                </div>`
                cards.innerHTML += boxClass
            }
        })
    }
}

async function searchCards(route, filter) {

    const response = await fetch(`http://localhost:3000/${route}/${filter}`)
    const listData = await response.json()
    const auxData = listData.filter((value) => {
        if (value.img) { return value }
    })
    cardsData = auxData.slice(0, 60)
    fillCards(cardsData)
}

cardsC.addEventListener("change", (event) => { searchCards('classes', event.target.value) })
cardsQ.addEventListener("change", (event) => { searchCards('qualities', event.target.value) })
cardsF.addEventListener("change", (event) => { searchCards('factions', event.target.value) })
cardsT.addEventListener("change", (event) => { searchCards('types', event.target.value) })
numbersOfCards.addEventListener("change", () => { fillCards() })