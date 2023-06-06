const box = document.querySelector(".container");
const addBtn = document.querySelector(".add-btn");
const mdBox = document.querySelector(".modal-container");
const mdClose = mdBox.querySelector(".modal-close");
const addForm = document.forms.add;


//localStorage
//.getItem(name)
//.setItem(name,value)
//const user = "Kykylin88";
let user = localStorage.getItem("cat12");
if (!user) {
    user = prompt("Ваше имя:", "Kykylin88");
    localStorage.setItem("cat12", user)
}
const path = `https://cats.petiteweb.dev/api/single/${user}`;
//const path = `https://cats.petiteweb.dev/api/single/Kykylin88`;

/*

*/
let cats = localStorage.getItem("cats-data"); //массив с котами

