document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("taskInput").value;
    let dueDate = document.getElementById("dueDate").value;
    let priority = document.getElementById("priority").value;
    let category = document.getElementById("category").value;

    if (taskInput.trim() === "") {
        alert("Please enter a task.");
        return;
    }

    let task = {
        text: taskInput,
        dueDate: dueDate,
        priority: priority,
        category: category,
        completed: false
    };

    saveTask(task);
    displayTasks();
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    displayTasks();
}

function displayTasks(filter = "all") {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach((task, index) => {
        if (filter !== "all" && task.priority !== filter) return;

        let li = document.createElement("li");
        li.className = task.priority;
        li.innerHTML = `
            <span ${task.completed ? 'class="completed"' : ""}>
                ${task.text} [${task.category}] - ${task.dueDate ? task.dueDate : "No Due Date"}
            </span>
            <button onclick="markCompleted(${index})">✔</button>
            <button onclick="deleteTask(${index})">❌</button>
        `;
        taskList.appendChild(li);
    });
}

function markCompleted(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

function filterTasks(priority) {
    displayTasks(priority);
}

function searchTasks() {
    let searchInput = document.getElementById("searchInput").value.toLowerCase();
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        if (task.text.toLowerCase().includes(searchInput)) {
            let li = document.createElement("li");
            li.className = task.priority;
            li.innerHTML = `
                <span>${task.text} [${task.category}] - ${task.dueDate}</span>
                <button onclick="markCompleted(${index})">✔</button>
                <button onclick="deleteTask(${index})">❌</button>
            `;
            taskList.appendChild(li);
        }
    });
}
