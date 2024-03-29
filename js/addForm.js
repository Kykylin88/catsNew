addBtn.addEventListener("click", e => {
    mdBox.style.display = "flex";
});
mdClose.addEventListener("click", e => {
    mdBox.style = null;
});
addForm.addEventListener("submit", e => {
    e.preventDefault();//остановить действие по умолчанию
    const body = {};
    console.log(addForm.children);//дочерние теги прямые потомки
    console.log(addForm.elements);//все элементы формы(inpyt/select/textarea/button)

    for (let i = 0; i < addForm.elements.length; i++) {
        const inp = addForm.elements[i];
        console.log(inp);//на сервер отправляется name=value
        console.log(inp.name);
        console.log(inp.value);
        if (inp.name) {//элемент формы имеет атрибут name (не являестя кнопкой)
            if (inp.type === "checkbox") {
                body[inp.name] = inp.checked;
            } else {
                body[inp.name] = inp.value;
            }
        }
    }
    console.log(body);
    fetch(path + "/add", {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
        .then(res => {
            if (res.ok) {
                addForm.reset();
                mdBox.style = null;
                createCard(body);
                cats.push(body);
                localStorage.setItem("cats-data", JSON.stringify(cats));
            } else {
                return res.json();
            }
        })
        .then(err => {
            if (err && err.message) {
                alert(err.message);
            }
        });
});
