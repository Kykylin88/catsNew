

//содаем карточку
function createCard(cat, el = box) {
    const card = document.createElement("div");
    card.className = "card";
    if (!cat.image) {
        card.classList.add("default");
    } else {
        card.style.backgroundImage = `url(${cat.image})`;
    }
    const name = document.createElement("h3");
    name.innerText = cat.name;
    const like = document.createElement("i");
    like.className = "fa-heart card__like";
    like.classList.add(cat.favorite ? "fa-solid" : "fa-regular")
    //нажатие на сердечко
    like.addEventListener("click", e => {
        e.stopPropagation() //если не написать удалятся все коты
        if (cat.id) {
            fetch(`${path}/update/${cat.id}`, {
                method: "PUT",
                headers: {                                     //передается информация что это обькт
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ favorite: !cat.favorite })  //из false true и на оборот
            })
                .then(res => {
                    if (res.status == 200) {
                        like.classList.toggle("fa-solid");
                        like.classList.toggle("fa-regular");
                        cats = cats.map(c => {
                            if (c.id === cat.id) {
                                c.favorite = !cat.favorite;
                            }
                            return c;//обязательно вернуть инаце сотрутся все коты из locastorage
                        })
                        localStorage.setItem("cats-data", JSON.stringify(cats));
                    }
                })
        }
    })
    const trash = document.createElement("i");
    trash.className = "fa-solid fa-trash card__trash";
    trash.addEventListener("click", e => {
        e.stopPropagation();
        //deleteCard(???, e.currentTarget.parentElement);
        deleteCard(cat.id, card);

    })
    card.append(like, name, trash,);
    if (cat.age >= 0) {
        const age = document.createElement("span");
        age.innerText = cat.age;
        card.append(age)
        // el.append(card);
    }
    card.addEventListener("click", e => {
        location.replace(`page.html?id=${cat.id}`)
    })

    // card.addEventListener("click", (e) => {
    // deleteCard(cat.id, card)
    //  });
    el.append(card);
}
//удаление карточки 

function deleteCard(id, el) {
    if (id) {
        fetch(`${path}/delete/${id}`, {
            method: "DELETE"
        })
            .then(res => {
                //console.log(res);
                //console.log(res.status);
                if (res.status === 200) {
                    el.remove();
                    cats = cats.filter(c => c.id !== id)
                    localStorage.setItem("cats-data", JSON.stringify(cats));
                }
            })
    }
}


//получение котов

//добавление id
// let ids = [];
// fetch(path + "/ids")
//     .then(res => res.json())
//     .then(data => {
//         console.log(data);
//         ids = [...data];
//         myCat.id = ids.length ? [ids.length - 1] + 1 : 1; //проверка на пустой массив
//         //myCat.id =7
//         // addCat(myCat);
//     })
//создание кота

function addCat(cat) {
    fetch(path + "/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(cat)
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
}
if (cats) {
    try {
        cats = JSON.parse(cats);
        for (let cat of cats) {
            createCard(cat, box);
            console.log(cat);
        }
    } catch (err) {
        if (err) {
            cats = null;
        }
    }
} else {//запрос котов с сервера
    fetch(path + "/show")
        .then(function (res) {
            console.log(res);
            if (res.statusText === "OK") {
                return res.json();
            }
        })
        .then(function (data) {
            // data ответ от сервера
            //console.log(data);
            if (!data.length) {
                box.innerHTML = "<div class \"empty\">У вас пока еще нет питомцев </div>"
            } else {
                cats = [...data];//диструктуризация (скопировать массив а не просто сделать ссылку на него)
                localStorage.setItem("cats-data", JSON.stringify(data));
                for (let c of data) {
                    createCard(c, box);
                }
            }
        })
}







