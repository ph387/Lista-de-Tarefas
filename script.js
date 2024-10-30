document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("addinput");
    const addButton = document.getElementById("addtask");
    const taskListContainer = document.getElementById("list");
    const taskCreatedCounter = document.querySelector("#task-1 span");
    const taskCompletedCounter = document.querySelector("#task-2 span");
    const noTasksSection = document.getElementById("fill");
    const maxChars = 30; // Limite de caracteres

    let taskCount = 0;
    let completedCount = 0;

    function updateCounters() {
        taskCreatedCounter.textContent = taskCount;
        taskCompletedCounter.textContent = completedCount;
    }

    function toggleNoTasksSection() {
        noTasksSection.style.display = taskCount === 0 ? "flex" : "none";
        taskListContainer.style.display = taskCount === 0 ? "none" : "block";
    }

    function adjustPadding() {
        // Adiciona padding-bottom quando há 4 ou mais tarefas
        if (taskCount >= 4) {
            taskListContainer.style.paddingBottom = "3.75rem";
        } else {
            taskListContainer.style.paddingBottom = "0";
        }
    }

    function addTask() {
        const taskText = input.value.trim();
        if (!taskText) return;

        let taskList = taskListContainer.querySelector("ul");
        if (!taskList) {
            taskList = document.createElement("ul");
            taskListContainer.appendChild(taskList);
        }

        const li = document.createElement("li");
        li.className = "base-list";
        li.id = "tempo";

        const completeButton = document.createElement("button");
        completeButton.innerHTML = '<img src="assets/CircleRegular.svg" alt="">';

        const taskDescription = document.createElement("p");
        taskDescription.textContent = taskText;

        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<img src="assets/Delete.svg" alt="">';

        li.appendChild(completeButton);
        li.appendChild(taskDescription);
        li.appendChild(deleteButton);
        taskList.appendChild(li);

        taskCount++;
        updateCounters();
        toggleNoTasksSection();
        adjustPadding();  // Ajusta o padding ao adicionar uma nova tarefa
        input.value = "";

        completeButton.addEventListener("click", () => {
            if (li.id === "completed") {
                li.id = "tempo";
                taskDescription.style.textDecoration = "none";
                taskDescription.style.color = "#262428";
                completeButton.innerHTML = '<img src="assets/CircleRegular.svg" alt="">';
                completedCount--;
            } else {
                li.id = "completed";
                taskDescription.style.textDecoration = "line-through";
                taskDescription.style.color = "#6B6572";
                completeButton.innerHTML = '<img src="assets/CheckCircleFill.svg" alt="">';
                completedCount++;
            }
            updateCounters();
        });

        deleteButton.addEventListener("click", () => {
            taskList.removeChild(li);
            taskCount--;
            if (li.id === "completed") {
                completedCount--;
            }
            updateCounters();
            toggleNoTasksSection();
            adjustPadding();  // Ajusta o padding ao remover uma tarefa

            if (taskList.children.length === 0) {
                taskListContainer.removeChild(taskList);
            }
        });
    }

    addButton.addEventListener("click", addTask);

    input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            addTask();
        }
    });

    input.addEventListener("input", () => {
        if (input.value.length === maxChars) {
            alert("Mais de 30 caracteres? Talvez seja melhor ser mais conciso!");
        }
    });

    toggleNoTasksSection();
});
