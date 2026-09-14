/* =====================================================
   MODERN TO-DO LIST
   Main JavaScript
   ===================================================== */


/* =====================================================
   1. APPLICATION STATE
   ===================================================== */

let tasks = loadTasks();

let currentFilter = "all";

let searchQuery = "";


/* =====================================================
   2. LOAD TASKS FROM LOCAL STORAGE
   ===================================================== */

function loadTasks() {

    const savedTasks = localStorage.getItem("modernTodoTasks");

    if (!savedTasks) {
        return [];
    }

    try {

        return JSON.parse(savedTasks);

    } catch (error) {

        console.error(
            "Unable to load saved tasks:",
            error
        );

        return [];
    }
}


/* =====================================================
   3. SAVE TASKS TO LOCAL STORAGE
   ===================================================== */

function saveTasks() {

    localStorage.setItem(
        "modernTodoTasks",
        JSON.stringify(tasks)
    );
}


/* =====================================================
   4. DOM ELEMENT REFERENCES
   ===================================================== */

const taskList =
    document.getElementById("taskList");

const emptyState =
    document.getElementById("emptyState");

const totalTasks =
    document.getElementById("totalTasks");

const activeTasks =
    document.getElementById("activeTasks");

const completedTasks =
    document.getElementById("completedTasks");

const searchInput =
    document.getElementById("searchInput");

const addTaskBtn =
    document.getElementById("addTaskBtn");

const filterButtons =
    document.querySelectorAll(".filter-btn");


/* =====================================================
   5. ADD TASK
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

    saveTasks();

    renderTasks();

    updateStatistics();
}


/* =====================================================
   6. RENDER TASKS
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

        const taskElement =
            createTaskElement(task);

        taskList.appendChild(taskElement);

    });
}


/* =====================================================
   7. CREATE TASK ELEMENT
   ===================================================== */

function createTaskElement(task) {

    const taskItem =
        document.createElement("div");

    taskItem.className = "task-item";


    if (task.completed) {

        taskItem.classList.add("completed");

    }


    /* -------------------------------
       Checkbox
       ------------------------------- */

    const checkbox =
        document.createElement("button");

    checkbox.className =
        "task-checkbox";

    checkbox.type = "button";

    checkbox.setAttribute(
        "aria-label",
        `Mark "${task.title}" as complete`
    );


    /* -------------------------------
       Task Text
       ------------------------------- */

    const taskText =
        document.createElement("span");

    taskText.className =
        "task-text";

    taskText.textContent =
        task.title;


    /* -------------------------------
       Delete Button
       ------------------------------- */

    const deleteButton =
        document.createElement("button");

    deleteButton.className =
        "delete-task";

    deleteButton.type = "button";

    deleteButton.textContent = "×";

    deleteButton.setAttribute(
        "aria-label",
        `Delete "${task.title}"`
    );


    /* -------------------------------
       Checkbox Event
       ------------------------------- */

    checkbox.addEventListener(
        "click",
        () => {

            toggleTask(task.id);

        }
    );


    /* -------------------------------
       Delete Event
       ------------------------------- */

    deleteButton.addEventListener(
        "click",
        () => {

            deleteTask(task.id);

        }
    );


    /* -------------------------------
       Build Task Element
       ------------------------------- */

    taskItem.appendChild(checkbox);

    taskItem.appendChild(taskText);

    taskItem.appendChild(deleteButton);


    return taskItem;
}


/* =====================================================
   8. TOGGLE TASK COMPLETION
   ===================================================== */

function toggleTask(taskId) {

    const task =
        tasks.find(
            task => task.id === taskId
        );


    if (!task) {
        return;
    }


    task.completed =
        !task.completed;


    saveTasks();

    renderTasks();

    updateStatistics();
}


/* =====================================================
   9. DELETE TASK
   ===================================================== */

function deleteTask(taskId) {

    tasks =
        tasks.filter(
            task => task.id !== taskId
        );


    saveTasks();

    renderTasks();

    updateStatistics();
}


/* =====================================================
   10. FILTER TASKS
   ===================================================== */

function getFilteredTasks() {

    let filteredTasks = [...tasks];


    /* -------------------------------
       Filter by Status
       ------------------------------- */

    if (currentFilter === "active") {

        filteredTasks =
            filteredTasks.filter(
                task => !task.completed
            );

    }


    else if (currentFilter === "completed") {

        filteredTasks =
            filteredTasks.filter(
                task => task.completed
            );

    }


    /* -------------------------------
       Filter by Search
       ------------------------------- */

    if (searchQuery !== "") {

        filteredTasks =
            filteredTasks.filter(task =>

                task.title
                    .toLowerCase()
                    .includes(
                        searchQuery.toLowerCase()
                    )

            );

    }


    return filteredTasks;
}


/* =====================================================
   11. UPDATE STATISTICS
   ===================================================== */

function updateStatistics() {

    const total =
        tasks.length;


    const completed =
        tasks.filter(
            task => task.completed
        ).length;


    const active =
        total - completed;


    totalTasks.textContent =
        total;


    activeTasks.textContent =
        active;


    completedTasks.textContent =
        completed;
}


/* =====================================================
   12. FILTER BUTTON EVENTS
   ===================================================== */

filterButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            currentFilter =
                button.dataset.filter;


            filterButtons.forEach(btn => {

                btn.classList.remove(
                    "active"
                );

            });


            button.classList.add("active");


            renderTasks();

        }
    );

});


/* =====================================================
   13. SEARCH
   ===================================================== */

searchInput.addEventListener(
    "input",
    event => {

        searchQuery =
            event.target.value.trim();

        renderTasks();

    }
);


/* =====================================================
   14. ADD TASK BUTTON
   ===================================================== */

addTaskBtn.addEventListener(
    "click",
    addTask
);


/* =====================================================
   15. INITIALIZE APPLICATION
   ===================================================== */

renderTasks();

updateStatistics();
