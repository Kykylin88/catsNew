/*const update = document.querySelector(".update");
const updForm = document.forms.upd;
const mdBoxUpd = document.querySelector(".modal-container");
const mdCloseUpd = mdBoxUpd.querySelector(".modal-close");
const updBtn = document.querySelector(".updBtn");
let cats = localStorage.getItem("cats-data");

update.addEventListener("click", e => {
    mdBoxUpd.style.display = "flex";
});
mdCloseUpd.addEventListener("click", e => {
    mdBoxUpd.style = null;
});



// fetch
updForm.addEventListener("submit", e => {
     
    e.preventDefault();
    const body = {};*/

const update = document.querySelector(".update");
const updForm = document.forms.upd;
const mdBoxUpd = document.querySelector(".modal-container");
const mdCloseUpd = mdBoxUpd.querySelector(".modal-close");
const updBtn = document.querySelector(".updBtn");
let cats = JSON.parse(localStorage.getItem("cats-data"));

update.addEventListener("click", e => {
    mdBoxUpd.style.display = "flex";
});

mdCloseUpd.addEventListener("click", e => {
    mdBoxUpd.style.display = "none";
});

// Обработчик отправки формы
updForm.addEventListener("submit", e => {

    e.preventDefault();

    const body = {};


    for (let i = 0; i < updForm.elements.length; i++) {
        const inp = updForm.elements[i];
        if (inp.name) {
            if (inp.type === "checkbox") {
                body[inp.name] = inp.checked;
            } else {
                body[inp.name] = inp.value;
            }
        }
    }

    console.log(body);

    fetch(`${path}/update/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.message.includes("Выполнено")) {
                cats = cats.map(cat => {
                    if (cat.id === body.id) {
                        return body;
                    }
                    return cat;
                })
                console.log(cats);
                box.innerHTML = "";
                cats.forEach(cat => {
                    createCart(cat, box);
                })
                updForm.reset()
                /*mdBoxUpd.style = null; */mdBoxUpd.style.display = "none";
                localStorage.setItem("cats-data", JSON.stringify(cats));
                
            } else {
                return res.json();
            }

        })

})
