const addBtn = document.querySelector('#add-btn');
const newTaskInput = document.querySelector("#wrapper input");
const taskContainer = document.querySelector("#tasks");
const error = document.getElementById("error");
const countValue = document.querySelector(".count-value");
let taskCount = 0;

// Function to display the count of tasks
const displayCount = (taskCount) => {
  countValue.innerText = taskCount;
};

// Function to add a task
const addTask = () => {
  const taskName = newTaskInput.value.trim();
  error.style.display = "none";

  if (!taskName) {
    setTimeout(() => {
      error.style.display = "block";
    }, 200);
    return;
  }

  const task = `<div class="task">
    <input type="checkbox" class="task-check">
    <span class="taskname">${taskName}</span>
    <button class="edit">
      <i class="fa-solid fa-pen-to-square"></i>
    </button>
    <button class="delete">
      <i class="fa-solid fa-trash-can"></i>
    </button>
  </div>`;

  taskContainer.insertAdjacentHTML("beforeend", task);

  // Select the newly added delete button and set up the event listener
  const deleteButton = taskContainer.lastElementChild.querySelector(".delete");
  deleteButton.onclick = () => {
    deleteButton.parentNode.remove();
    taskCount = Math.max(0, taskCount - 1); // Ensure taskCount doesn't go below zero
    displayCount(taskCount);
  };

  // Select the newly added edit button and set up the event listener
  const editButton = taskContainer.lastElementChild.querySelector(".edit");
  editButton.onclick = (e) => {
    let targetElement = e.target;
    if (!(e.target.className == "edit")) {
      targetElement = e.target.parentElement;
    }
    newTaskInput.value = targetElement.previousElementSibling?.innerText;
    targetElement.parentNode.remove();
    taskCount = Math.max(0, taskCount - 1); // Ensure taskCount doesn't go below zero
    displayCount(taskCount);
  };

  // Select the newly added checkbox and set up the event listener
  const checkBox = taskContainer.lastElementChild.querySelector(".task-check");
  checkBox.onchange = () => {
    checkBox.nextElementSibling.classList.toggle("completed");
    if (checkBox.checked) {
      taskCount = Math.max(0, taskCount - 1); // Ensure taskCount doesn't go below zero
    } else {
      taskCount += 1;
    }
    displayCount(taskCount);
  };

  taskCount += 1;
  displayCount(taskCount);
  newTaskInput.value = ""; // Clear the input after adding the task
};

// Add event listener to the add button
addBtn.addEventListener("click", addTask);

window.onload = () => {
  taskCount = 0;
  displayCount(taskCount);
  newTaskInput.value = "";
};
