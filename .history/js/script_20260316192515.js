const input = document.getElementById("taskInput")
const addBtn = document.getElementById("addBtn")
const list = document.getElementById("taskList")

addBtn.addEventListener("click", addTask)

function addTask(){
    const taskText = input.value.trim()

    if(taskText === "") return

    const li = document.createElement("li")

    li.innerHTML = `
    <span>${taskText}</span>
    <button class="delete"><img src="images/delete.png" alt="Delete icon"></button>
    `

    list.appendChild(li)

    input.value=""
}

list.addEventListener("click", function(e){
    if(e.target.classList.contains("delete")){
        e.target.parentElement.remove()
    }
})