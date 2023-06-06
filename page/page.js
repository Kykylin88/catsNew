const back = document.querySelector(".back");
back.addEventListener("click", (e) => {
  location.href = "index.html";
});

//location.search => ?n=v
let id = location.search.split("=");
id = id[id.length - 1];
// console.log(id);
const box = document.querySelector(".info");
let user = localStorage.getItem("cat12");

if (!user) {
    user = prompt("Ваше  имя: ", "Kykylin88");
    localStorage.setItem("cat12", user);
}

const path = `https://cats.petiteweb.dev/api/single/${user}`;


// Вывыд информации о коте по id
    const h2 = document.querySelector(".modal_name");
    const inputId = document.querySelector("#id");
    const inputName = document.querySelector("#name");
    const img = document.querySelector("#img");
    fetch(`${path}/show/${id}`)
        .then(res => {
            if (res.ok) {
                return res.json()
            }
        })
        .then(data => {
            h2.innerText = `${data.name}`;
            inputId.placeholder = `${data.id}`;
            inputName.placeholder = `${data.name}`;
            if (!data.description) {
                box.innerHTML += `<p>Нет данных</p>`;
            } else {
                box.innerHTML += `<p>${data.description}</p>`;
            }
            if (!data.rate) {
                box.innerHTML += `<div>Нет оценки</div>` 
            } else {
                box.innerHTML += `<div>Рейтинг: ${data.rate}</div>`;
            }
            if (!data.age) {
                box.innerHTML += `<div></div>` 
            } else {
                box.innerHTML += `<div>Возраст: ${data.age}</div>`;
            }
            if (!data.image) {
                box.className = "default"; 
            } else {
                box.style.backgroundImage = `url(${data.image})`;
            }
        })



