if(JSON.parse(localStorage.getItem('keys') == null)) {
    localStorage.setItem('keys',JSON.stringify([]))
}
if(JSON.parse(localStorage.getItem('todolistdata')) == null){
    localStorage.setItem("todolistdata",JSON.stringify([]))
}
function keyGenerator(){
    let array = [],keyWord = [],key;
    for(let i = 97; i <= 122; i++) array.push(String.fromCharCode(i))
    for(let i = 0; i < 6; i++) keyWord.push(array[Math.floor(Math.random()*27)])
    key = keyWord.join("")
    let checkedKey = checkKey(key)
    key = (checkedKey == key) ? key : checkedKey
    return key;
}
// checkKey
  const checkKey =(key) => {
      let storage = JSON.parse(localStorage.getItem('keys'))
      if(storage.includes(key)){
         let newKey = keyGenerator()
         return newKey;
      }else {
          storage.push(key)
          localStorage.setItem("keys",JSON.stringify(storage))
          return key
      }
  }
// createItem
const createTodoList = (list)=> {
    return `
        <div class="todo__listItem">
            <span class=${list.className}>${list.text}</span>
            <div class="todo__listGadgets">
                <input class="checkbox" id=${list.id} onclick="setCheckBox(this)" type="checkbox"  ${list.checked}>
                <button class="close__button" id=${list.id}  onclick="closeButton(this)">X</button>
            </div>
        </div>
    `
}
// setItem
const addButton = document.querySelector(".addButton")
addButton.onclick = ()=> {
    let inputValue = document.querySelector(".input").value
    if(inputValue == "") {
        alert("Please Enter Something!")
    }else {
        let todoListData = JSON.parse(localStorage.getItem("todolistdata"))
        todoListData.push({id:keyGenerator(), text:inputValue, checked: "" , value: "on", className: ""})
        document.querySelector(".todo__list").innerHTML = todoListData.map(list=>createTodoList(list)).reverse().join("")
        localStorage.setItem("todolistdata",JSON.stringify(todoListData))
        document.querySelector(".input").value = ""
    }
}
// removeItem
const closeButton = (x) => {
    let filtered = JSON.parse(localStorage.getItem("todolistdata")).filter(a=>a.id != x.getAttribute("id"))
    document.querySelector(".todo__list").innerHTML = filtered.map(list=>createTodoList(list)).reverse().join("")
    localStorage.setItem("todolistdata",JSON.stringify(filtered))
    let filterKeys = JSON.parse(localStorage.getItem('keys')).filter(a=>a != x.getAttribute("id"))
    localStorage.setItem("keys",JSON.stringify(filterKeys))
}
// 
// addCheckbox
const setCheckBox = (x)=> {
    let storage = JSON.parse(localStorage.getItem("todolistdata"))
    let findItem = storage.find(a=>a.id == x.id)
    let index = storage.indexOf(findItem)

    if(findItem.value == "on"){
        findItem.value = "off"
        findItem.checked = "checked"
        findItem.className = "throughLine"
        storage[index] = findItem
        localStorage.setItem("todolistdata",JSON.stringify(storage))
        document.querySelector(".todo__list").innerHTML = JSON.parse(localStorage.getItem("todolistdata"))
        .map(list=>createTodoList(list))
        .reverse()
        .join("")
    }else {
        findItem.value = "on"
        findItem.checked = ""
        findItem.className = ""
        storage[index] = findItem
        localStorage.setItem("todolistdata",JSON.stringify(storage))
        document.querySelector(".todo__list").innerHTML = JSON.parse(localStorage.getItem("todolistdata"))
        .map(list=>createTodoList(list))
        .reverse()
        .join("")
    }
}
// onload
window.onload = () => {
    let todoListData = JSON.parse(localStorage.getItem("todolistdata"))
    document.querySelector(".todo__list").innerHTML = todoListData.map(list=>createTodoList(list)).reverse().join("")
}