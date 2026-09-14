/* =====================================================
   MODERN TO-DO LIST
   Main JavaScript
   ===================================================== */


/* =====================================================
   1. APPLICATION STATE
   ===================================================== */

let tasks = [];

let currentFilter = "all";

let searchQuery = "";
/* =====================================================
   2. DOM ELEMENT REFERENCES
   ===================================================== */

const taskList = document.getElementById("taskList");

const emptyState = document.getElementById("emptyState");

const totalTasks = document.getElementById("totalTasks");

const activeTasks = document.getElementById("activeTasks");

const completedTasks = document.getElementById("completedTasks");

const searchInput = document.getElementById("searchInput");

const addTaskBtn = document.getElementById("addTaskBtn");

const filterButtons = document.querySelectorAll(".filter-btn");
/* =====================================================
   3. ADD TASK
   ===================================================== */

function addTask() {

    const title = prompt("Enter your task:");

    if (!title) {
        return;
    }

    const trimmedTitle = title.trim();

    if (trimmedTitle === "") {
        return;
    }

    const newTask = {
        id: Date.now(),
        title: trimmedTitle,
        completed: false
    };

    tasks.push(newTask);

    renderTasks();

    updateStatistics();
}
/* =====================================================
   4. RENDER TASKS
   ===================================================== */

function renderTasks() {

    taskList.innerHTML = "";

    const filteredTasks = getFilteredTasks();

    if (filteredTasks.length === 0) {

        emptyState.hidden = false;

        return;

    }

    emptyState.hidden = true;


    filteredTasks.forEach(task => {

        const taskElement = createTaskElement(task);

        taskList.appendChild(taskElement);

    });
}
/* =====================================================
   5. CREATE TASK ELEMENT
   ===================================================== */

function createTaskElement(task) {

    const taskItem = document.createElement("div");

    taskItem.className = "task-item";

    if (task.completed) {
        taskItem.classList.add("completed");
    }


    const checkbox = document.createElement("button");

    checkbox.className = "task-checkbox";

    checkbox.type = "button";

    checkbox.setAttribute(
        "aria-label",
        `Mark "${task.title}" as complete`
    );


    const taskText = document.createElement("span");

    taskText.className = "task-text";

    taskText.textContent = task.title;


    const deleteButton = document.createElement("button");

    deleteButton.className = "delete-task";

    deleteButton.type = "button";

    deleteButton.textContent = "×";

    deleteButton.setAttribute(
        "aria-label",
        `Delete "${task.title}"`
    );


    checkbox.addEventListener("click", () => {

        toggleTask(task.id);

    });


    deleteButton.addEventListener("click", () => {

        deleteTask(task.id);

    });


    taskItem.appendChild(checkbox);

    taskItem.appendChild(taskText);

    taskItem.appendChild(deleteButton);


    return taskItem;
}
/* =====================================================
   6. TOGGLE TASK
   ===================================================== */

function toggleTask(taskId) {

    const task = tasks.find(
        task => task.id === taskId
    );

    if (!task) {
        return;
    }

    task.completed = !task.completed;

    renderTasks();

    updateStatistics();
}
/* =====================================================
   7. DELETE TASK
   ===================================================== */

function deleteTask(taskId) {

    tasks = tasks.filter(
        task => task.id !== taskId
    );

    renderTasks();

    updateStatistics();
}
/* =====================================================
   8. FILTER TASKS
   ===================================================== */

function getFilteredTasks() {

    let filteredTasks = [...tasks];


    /* Filter by status */

    if (currentFilter === "active") {

        filteredTasks = filteredTasks.filter(
            task => !task.completed
        );

    }

    else if (currentFilter === "completed") {

        filteredTasks = filteredTasks.filter(
            task => task.completed
        );

    }


    /* Filter by search query */

    if (searchQuery !== "") {

        filteredTasks = filteredTasks.filter(task =>
            task.title
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
        );

    }


    return filteredTasks;
}
/* =====================================================
   9. UPDATE STATISTICS
   ===================================================== */

function updateStatistics() {

    const total = tasks.length;

    const completed = tasks.filter(
        task => task.completed
    ).length;

    const active = total - completed;


    totalTasks.textContent = total;

    activeTasks.textContent = active;

    completedTasks.textContent = completed;
}
/* =====================================================
   10. FILTER BUTTON EVENTS
   ===================================================== */

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        currentFilter = button.dataset.filter;


        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });


        button.classList.add("active");


        renderTasks();

    });

});
/* =====================================================
   11. SEARCH
   ===================================================== */

searchInput.addEventListener("input", event => {

    searchQuery = event.target.value.trim();

    renderTasks();

});
/* =====================================================
   12. ADD TASK BUTTON
   ===================================================== */

addTaskBtn.addEventListener("click", addTask);
/* =====================================================
   13. INITIALIZE APPLICATION
   ===================================================== */

renderTasks();

updateStatistics();
