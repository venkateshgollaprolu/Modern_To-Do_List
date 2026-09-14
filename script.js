/* =====================================================
   MODERN TO-DO LIST
   Complete JavaScript
   Features through Step 11
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

    const savedTasks =
        localStorage.getItem("modernTodoTasks");

    if (!savedTasks) {
        return [];
    }

    try {

        const parsedTasks =
            JSON.parse(savedTasks);

        /*
         * Normalize old tasks.
         *
         * Tasks created before Priority and Due Date
         * were introduced may not contain these fields.
         */

        return parsedTasks.map(task => ({

            id: task.id,

            title: task.title,

            completed:
                Boolean(task.completed),

            priority:
                task.priority || "medium",

            dueDate:
                task.dueDate || ""

        }));

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
   5. TASK MODAL ELEMENTS
   ===================================================== */

const taskModal =
    document.getElementById("taskModal");

const taskForm =
    document.getElementById("taskForm");

const taskInput =
    document.getElementById("taskInput");

const closeModalBtn =
    document.getElementById("closeModalBtn");

const cancelModalBtn =
    document.getElementById("cancelModalBtn");


/* =====================================================
   6. DATE & GREETING ELEMENTS
   ===================================================== */

const greetingElement =
    document.getElementById("greeting");

const currentDateElement =
    document.getElementById("currentDate");


/* =====================================================
   7. PRIORITY & DUE DATE ELEMENTS
   ===================================================== */

const dueDateInput =
    document.getElementById("dueDateInput");

const priorityInputs =
    document.querySelectorAll(
        'input[name="priority"]'
    );


/* =====================================================
   8. DATE & GREETING
   ===================================================== */

function updateGreeting() {

    const currentHour =
        new Date().getHours();

    let greeting;

    if (currentHour < 12) {

        greeting =
            "Good Morning ☀️";

    } else if (currentHour < 17) {

        greeting =
            "Good Afternoon 👋";

    } else if (currentHour < 21) {

        greeting =
            "Good Evening 🌆";

    } else {

        greeting =
            "Good Night 🌙";
    }

    greetingElement.textContent =
        greeting;
}


/* =====================================================
   9. UPDATE CURRENT DATE
   ===================================================== */

function updateDate() {

    const today =
        new Date();

    const weekday =
        today.toLocaleDateString(
            "en-US",
            {
                weekday: "long"
            }
        );

    const month =
        today.toLocaleDateString(
            "en-US",
            {
                month: "long"
            }
        );

    const day =
        today.getDate();

    const ordinalSuffix =
        getOrdinalSuffix(day);

    currentDateElement.textContent =
        `${weekday}, ${month} ${day}${ordinalSuffix}`;
}


/* =====================================================
   10. GET ORDINAL SUFFIX
   ===================================================== */

function getOrdinalSuffix(day) {

    if (
        day >= 11 &&
        day <= 13
    ) {

        return "th";
    }

    switch (day % 10) {

        case 1:
            return "st";

        case 2:
            return "nd";

        case 3:
            return "rd";

        default:
            return "th";
    }
}


/* =====================================================
   11. GET SELECTED PRIORITY
   ===================================================== */

function getSelectedPriority() {

    const selectedPriority =
        document.querySelector(
            'input[name="priority"]:checked'
        );

    return selectedPriority
        ? selectedPriority.value
        : "medium";
}


/* =====================================================
   12. OPEN ADD TASK MODAL
   ===================================================== */

function openTaskModal() {

    taskModal.hidden = false;

    taskInput.value = "";

    /*
     * Reset priority to Medium.
     */

    priorityInputs.forEach(input => {

        input.checked =
            input.value === "medium";

    });

    /*
     * Clear due date.
     */

    dueDateInput.value = "";

    /*
     * Make sure modal is in ADD mode.
     */

    delete taskForm.dataset.editingId;

    document.getElementById(
        "modalTitle"
    ).textContent =
        "Add New Task";

    document.querySelector(
        ".modal-label"
    ).textContent =
        "Stay productive";

    document.querySelector(
        ".submit-task-btn"
    ).textContent =
        "Add Task";

    setTimeout(() => {

        taskInput.focus();

    }, 50);
}


/* =====================================================
   13. OPEN EDIT TASK MODAL
   ===================================================== */

function openEditModal(taskId) {

    const task =
        tasks.find(
            task => task.id === taskId
        );

    if (!task) {
        return;
    }

    /*
     * Open modal.
     */

    taskModal.hidden = false;

    /*
     * Load existing title.
     */

    taskInput.value =
        task.title;

    /*
     * Store the ID of the task
     * currently being edited.
     */

    taskForm.dataset.editingId =
        taskId;

    /*
     * Load priority.
     *
     * Older tasks default to Medium.
     */

    const taskPriority =
        task.priority || "medium";

    priorityInputs.forEach(input => {

        input.checked =
            input.value === taskPriority;

    });

    /*
     * Load due date.
     */

    dueDateInput.value =
        task.dueDate || "";

    /*
     * Change modal text to EDIT mode.
     */

    document.getElementById(
        "modalTitle"
    ).textContent =
        "Edit Task";

    document.querySelector(
        ".modal-label"
    ).textContent =
        "Update your task";

    document.querySelector(
        ".submit-task-btn"
    ).textContent =
        "Save Changes";

    /*
     * Focus and select existing title.
     */

    setTimeout(() => {

        taskInput.focus();

        taskInput.select();

    }, 50);
}


/* =====================================================
   14. CLOSE TASK MODAL
   ===================================================== */

function closeTaskModal() {

    taskModal.hidden = true;

    taskForm.reset();

    delete taskForm.dataset.editingId;

    /*
     * Restore default priority.
     */

    priorityInputs.forEach(input => {

        input.checked =
            input.value === "medium";

    });

    /*
     * Clear due date.
     */

    dueDateInput.value = "";

    /*
     * Restore ADD mode.
     */

    document.getElementById(
        "modalTitle"
    ).textContent =
        "Add New Task";

    document.querySelector(
        ".modal-label"
    ).textContent =
        "Stay productive";

    document.querySelector(
        ".submit-task-btn"
    ).textContent =
        "Add Task";
}


/* =====================================================
   15. ADD OR UPDATE TASK
   ===================================================== */

function addTask(event) {

    event.preventDefault();

    const title =
        taskInput.value.trim();

    /*
     * Don't allow empty tasks.
     */

    if (title === "") {

        taskInput.focus();

        return;
    }

    const priority =
        getSelectedPriority();

    const dueDate =
        dueDateInput.value;

    const editingId =
        taskForm.dataset.editingId;


    /* =================================================
       EDIT EXISTING TASK
       ================================================= */

    if (editingId) {

        const task =
            tasks.find(
                task =>
                    task.id ===
                    Number(editingId)
            );

        if (task) {

            task.title =
                title;

            task.priority =
                priority;

            task.dueDate =
                dueDate;
        }

    }


    /* =================================================
       CREATE NEW TASK
       ================================================= */

    else {

        const newTask = {

            id: Date.now(),

            title: title,

            completed: false,

            priority: priority,

            dueDate: dueDate

        };

        tasks.push(newTask);
    }


    /*
     * Save changes.
     */

    saveTasks();

    /*
     * Update UI.
     */

    renderTasks();

    updateStatistics();

    /*
     * Close modal.
     */

    closeTaskModal();
}


/* =====================================================
   16. GET DUE DATE STATUS
   ===================================================== */

function getDueDateStatus(dueDate) {

    if (!dueDate) {

        return null;
    }

    /*
     * Get today's date without time.
     */

    const today =
        new Date();

    today.setHours(
        0,
        0,
        0,
        0
    );

    /*
     * Convert stored date into Date object.
     */

    const due =
        new Date(
            `${dueDate}T00:00:00`
        );

    /*
     * Calculate difference in days.
     */

    const difference =
        Math.round(
            (
                due - today
            ) /
            (
                1000 *
                60 *
                60 *
                24
            )
        );


    /*
     * Past date
     */

    if (difference < 0) {

        return {

            label: "Overdue",

            className: "overdue"

        };
    }


    /*
     * Today
     */

    if (difference === 0) {

        return {

            label: "Today",

            className: "today"

        };
    }


    /*
     * Tomorrow
     */

    if (difference === 1) {

        return {

            label: "Tomorrow",

            className: "tomorrow"

        };
    }


    /*
     * Future date
     */

    return {

        label:
            due.toLocaleDateString(
                "en-US",
                {
                    month: "short",
                    day: "numeric"
                }
            ),

        className: "upcoming"

    };
}


/* =====================================================
   17. RENDER TASKS
   ===================================================== */

function renderTasks() {

    /*
     * Clear current task list.
     */

    taskList.innerHTML = "";

    /*
     * Get filtered tasks.
     */

    const filteredTasks =
        getFilteredTasks();


    /*
     * Show empty state if no tasks exist.
     */

    if (
        filteredTasks.length === 0
    ) {

        emptyState.hidden = false;

        return;
    }


    /*
     * Hide empty state.
     */

    emptyState.hidden = true;


    /*
     * Create each task element.
     */

    filteredTasks.forEach(task => {

        const taskElement =
            createTaskElement(task);

        taskList.appendChild(
            taskElement
        );
    });
}


/* =====================================================
   18. CREATE TASK ELEMENT
   ===================================================== */

function createTaskElement(task) {

    /*
     * Main task container.
     */

    const taskItem =
        document.createElement("div");

    taskItem.className =
        "task-item";


    /*
     * Add completed class.
     */

    if (task.completed) {

        taskItem.classList.add(
            "completed"
        );
    }


    /*
     * Accessibility label.
     */

    taskItem.setAttribute(
        "aria-label",
        task.completed
            ? `Completed task: ${task.title}`
            : `Active task: ${task.title}`
    );


    /* =================================================
       CHECKBOX
       ================================================= */

    const checkbox =
        document.createElement("button");

    checkbox.className =
        "task-checkbox";

    checkbox.type =
        "button";


    /*
     * Dynamic accessibility label.
     */

    checkbox.setAttribute(
        "aria-label",
        task.completed
            ? `Mark "${task.title}" as active`
            : `Mark "${task.title}" as complete`
    );


    /* =================================================
       TASK CONTENT
       ================================================= */

    const taskContent =
        document.createElement("div");

    taskContent.className =
        "task-content";


    /*
     * Task title.
     */

    const taskText =
        document.createElement("span");

    taskText.className =
        "task-text";

    taskText.textContent =
        task.title;


    /* =================================================
       TASK META
       ================================================= */

    const taskMeta =
        document.createElement("div");

    taskMeta.className =
        "task-meta";


    /* =================================================
       PRIORITY BADGE
       ================================================= */

    const priorityBadge =
        document.createElement("span");

    const priority =
        task.priority || "medium";

    priorityBadge.className =
        `task-priority ${priority}`;

    priorityBadge.textContent =
        `${priority.charAt(0).toUpperCase()}${priority.slice(1)} Priority`;

    taskMeta.appendChild(
        priorityBadge
    );


    /* =================================================
       DUE DATE BADGE
       ================================================= */

    /*
     * Don't show overdue/today/etc.
     * for completed tasks.
     */

    if (
        task.dueDate &&
        !task.completed
    ) {

        const dueDateBadge =
            document.createElement("span");

        const dueStatus =
            getDueDateStatus(
                task.dueDate
            );

        dueDateBadge.className =
            `task-due-date ${dueStatus.className}`;


        if (
            dueStatus.className ===
            "overdue"
        ) {

            dueDateBadge.textContent =
                `⚠️ ${dueStatus.label}`;

        } else {

            dueDateBadge.textContent =
                `📅 ${dueStatus.label}`;
        }


        taskMeta.appendChild(
            dueDateBadge
        );
    }


    /*
     * Build task content.
     */

    taskContent.appendChild(
        taskText
    );

    taskContent.appendChild(
        taskMeta
    );


    /* =================================================
       TASK ACTIONS
       ================================================= */

    const actionsContainer =
        document.createElement("div");

    actionsContainer.className =
        "task-actions";


    /* =================================================
       EDIT BUTTON
       ================================================= */

    const editButton =
        document.createElement("button");

    editButton.className =
        "edit-task";

    editButton.type =
        "button";

    editButton.textContent =
        "✎";

    editButton.setAttribute(
        "aria-label",
        `Edit "${task.title}"`
    );


    /* =================================================
       DELETE BUTTON
       ================================================= */

    const deleteButton =
        document.createElement("button");

    deleteButton.className =
        "delete-task";

    deleteButton.type =
        "button";

    deleteButton.textContent =
        "×";

    deleteButton.setAttribute(
        "aria-label",
        `Delete "${task.title}"`
    );


    /* =================================================
       CHECKBOX EVENT
       ================================================= */

    checkbox.addEventListener(
        "click",
        () => {

            toggleTask(
                task.id
            );
        }
    );


    /* =================================================
       EDIT EVENT
       ================================================= */

    editButton.addEventListener(
        "click",
        () => {

            openEditModal(
                task.id
            );
        }
    );


    /* =================================================
       DELETE EVENT
       ================================================= */

    deleteButton.addEventListener(
        "click",
        () => {

            deleteTask(
                task.id
            );
        }
    );


    /* =================================================
       BUILD TASK ELEMENT
       ================================================= */

    actionsContainer.appendChild(
        editButton
    );

    actionsContainer.appendChild(
        deleteButton
    );

    taskItem.appendChild(
        checkbox
    );

    taskItem.appendChild(
        taskContent
    );

    taskItem.appendChild(
        actionsContainer
    );


    return taskItem;
}


/* =====================================================
   19. TOGGLE TASK COMPLETION
   ===================================================== */

function toggleTask(taskId) {

    const task =
        tasks.find(
            task => task.id === taskId
        );

    if (!task) {

        return;
    }


    /*
     * Toggle completion state.
     */

    task.completed =
        !task.completed;


    /*
     * Save updated task.
     */

    saveTasks();


    /*
     * Refresh interface.
     */

    renderTasks();

    updateStatistics();
}


/* =====================================================
   20. DELETE TASK
   ===================================================== */

function deleteTask(taskId) {

    const task =
        tasks.find(
            task => task.id === taskId
        );

    if (!task) {

        return;
    }


    /*
     * Ask for confirmation.
     */

    const confirmed =
        confirm(
            `Delete "${task.title}"?`
        );


    if (!confirmed) {

        return;
    }


    /*
     * Remove task.
     */

    tasks =
        tasks.filter(
            task =>
                task.id !== taskId
        );


    /*
     * Save changes.
     */

    saveTasks();


    /*
     * Refresh interface.
     */

    renderTasks();

    updateStatistics();
}


/* =====================================================
   21. FILTER TASKS
   ===================================================== */

function getFilteredTasks() {

    /*
     * Create a copy so the original
     * tasks array isn't modified.
     */

    let filteredTasks =
        [...tasks];


    /* =================================================
       FILTER BY STATUS
       ================================================= */

    if (
        currentFilter ===
        "active"
    ) {

        filteredTasks =
            filteredTasks.filter(
                task =>
                    !task.completed
            );

    } else if (
        currentFilter ===
        "completed"
    ) {

        filteredTasks =
            filteredTasks.filter(
                task =>
                    task.completed
            );
    }


    /* =================================================
       FILTER BY SEARCH
       ================================================= */

    if (
        searchQuery !== ""
    ) {

        filteredTasks =
            filteredTasks.filter(
                task =>
                    task.title
                        .toLowerCase()
                        .includes(
                            searchQuery
                        )
            );
    }


    return filteredTasks;
}


/* =====================================================
   22. UPDATE STATISTICS
   ===================================================== */

function updateStatistics() {

    /*
     * Total number of tasks.
     */

    const total =
        tasks.length;


    /*
     * Number of completed tasks.
     */

    const completed =
        tasks.filter(
            task =>
                task.completed
        ).length;


    /*
     * Number of active tasks.
     */

    const active =
        total - completed;


    /*
     * Update statistics.
     */

    totalTasks.textContent =
        total;

    activeTasks.textContent =
        active;

    completedTasks.textContent =
        completed;
}


/* =====================================================
   23. FILTER BUTTON EVENTS
   ===================================================== */

filterButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            /*
             * Store selected filter.
             */

            currentFilter =
                button.dataset.filter;


            /*
             * Remove active state
             * from all buttons.
             */

            filterButtons.forEach(btn => {

                btn.classList.remove(
                    "active"
                );
            });


            /*
             * Activate clicked button.
             */

            button.classList.add(
                "active"
            );


            /*
             * Re-render tasks.
             */

            renderTasks();
        }
    );
});
/* =====================================================
   24. SEARCH
   ===================================================== */

searchInput.addEventListener(
    "input",
    event => {

        searchQuery =
            event.target.value
                .trim()
                .toLowerCase();

        renderTasks();
    }
);


/* =====================================================
   25. ADD TASK MODAL EVENTS
   ===================================================== */

addTaskBtn.addEventListener(
    "click",
    openTaskModal
);


closeModalBtn.addEventListener(
    "click",
    closeTaskModal
);


cancelModalBtn.addEventListener(
    "click",
    closeTaskModal
);


taskForm.addEventListener(
    "submit",
    addTask
);


/* =====================================================
   26. CLOSE MODAL WHEN CLICKING OUTSIDE
   ===================================================== */

taskModal.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            taskModal
        ) {

            closeTaskModal();
        }
    }
);


/* =====================================================
   27. CLOSE MODAL WITH ESCAPE
   ===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            !taskModal.hidden
        ) {

            closeTaskModal();
        }
    }
);


/* =====================================================
   28. INITIALIZE APPLICATION
   ===================================================== */

renderTasks();

updateStatistics();

updateGreeting();

updateDate();
