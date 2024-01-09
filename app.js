let ranImg = document.getElementById('random-img')
let searchRes = document.getElementById('search-res')
fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then(res => res.json())
    .then(data => {
        const meal = data.meals[0];
        ranImg.innerHTML = `<img src="${meal.strMealThumb}" alt="${meal.strMeal}">
       <h2>${meal.strMeal}</h2>`;
        ranImg.setAttribute('onclick', `details('${meal.idMeal}')`)
    })

let searchBtn = document.getElementById('btn')
searchBtn.addEventListener('click', () => {
    searchRes.style.display = "block"
    let inputValue = document.getElementById('values').value
    searchRes.innerHTML = `<h2>Searched results : ${inputValue}</h2>`
    let cards = document.getElementById('details')
    cards.innerHTML = ""
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${inputValue}`)
        .then(response => response.json())
        .then(data => {
            const items = document.getElementById("items")
            items.innerHTML = ""
            if (data.meals == null) {
                document.getElementById("msg").style.display = "block"
            } else {
                document.getElementById("msg").style.display = "none"
                data.meals.forEach(meal => {
                    itemDiv = document.createElement("div")
                    itemDiv.className = "singleItem"
                    itemDiv.setAttribute('onclick', `details('${meal.idMeal}')`)
                    let itemInfo = `
                <div class="card " style="width: 12rem;">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body text-center">
                        <h3 class="card-text">${meal.strMeal}</h3>
                    </div>
                </div>
                `
                    itemDiv.innerHTML = itemInfo
                    items.appendChild(itemDiv)
                })
            }

        })
})
let modal = document.getElementById("myModal");
let span = document.getElementsByClassName("close")[0];

function details(id) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(res => res.json())
        .then(detail => {
            let meal = detail.meals[0]
            let modalContent = document.getElementById("modal-content")
            modalContent.innerHTML = ""
            let detailsDiv = document.createElement("div")
            let detailsInfo = `
        <div class="card " style="width: 19rem;">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body ">
                <h2 class="card-text">${meal.strMeal}</h2>
                <h4>${meal.strArea}, ${meal.strCategory}</h4>
                <h3>Ingredients</h3>
                <ul>
                    
                    <li>${meal.strIngredient1}</li>
                    <li>${meal.strIngredient2}</li>
                    <li>${meal.strIngredient3}</li>
                    <li>${meal.strIngredient4}</li>
                    <li>${meal.strIngredient5}</li>    
                </ul>
            </div>
        </div>
        `
            detailsDiv.innerHTML = detailsInfo
            modalContent.appendChild(detailsDiv)
            modal.style.display = "block"
        })
}
span.onclick = function () {
    modal.style.display = "none"
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none"
    }
}

