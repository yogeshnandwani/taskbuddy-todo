const input = document.getElementById("taskInput")
const addBtn = document.getElementById("addBtn")
const list = document.getElementById("taskList")
let tasks = JSON.parse(localStorage.getItem("tasks")) || []

addBtn.addEventListener("click", addTask)

function addTask() {
    const taskText = input.value.trim()

    if (taskText === "") return

    tasks.push({
        text: taskText,
        done: false
    })

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

        if(task.done){
            li.classList.add("completed")
        }

        li.innerHTML = `
        <div class="task-left">
            <input type="checkbox" class="check" ${task.done ? "checked" : ""}>
            <span>${task.text}</span>
        </div>
        <button class="delete">
            <img src="images/delete.png" alt="Delete icon">
        </button>
        `

        list.appendChild(li)
    })
    updateTaskCount()
}

list.addEventListener("click", function(e){
    if(e.target.classList.contains("check")){

        const index = [...list.children].indexOf(e.target.closest("li"))

        tasks[index].done = e.target.checked

        saveTasks()
    }

    const deleteBtn = e.target.closest(".delete")

    if(deleteBtn){

        const index = [...list.children].indexOf(deleteBtn.parentElement)

        tasks.splice(index,1)

        saveTasks()
    }
})

function updateTaskCount(){

    const remaining = tasks.filter(task => !task.done).length

    const countText = remaining === 0 
        ? "No task left" 
        : `${remaining} tasks left`

    document.getElementById("taskCount").textContent = countText
}

renderTasks()