const input = document.getElementById("taskInput")
const addBtn = document.getElementById("addBtn")
const list = document.getElementById("taskList")
let tasks = JSON.parse(localStorage.getItem("tasks")) || []

addBtn.addEventListener("click", addTask)

function addTask() {
    const taskText = input.value.trim()

    if (taskText === "") return

    tasks.push(taskText)

    saveTasks()

    input.value = ""
}

function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks))
    renderTasks()
}

function renderTasks(){
    list.innerHTML = ""

    tasks.forEach(task => {

        const li = document.createElement("li")

        li.innerHTML = `
        <span>${task}</span>
        <button class="delete">
            <img src="images/delete.png" alt="Delete icon">
        </button>
        `

        list.appendChild(li)
    })
}

list.addEventListener("click", function(e){
    const deleteBtn = e.target.closest(".delete")

    if(deleteBtn){

        const index = [...list.children].indexOf(deleteBtn.parentElement)

        tasks.splice(index,1)

        saveTasks()
    }
})

renderTasks()