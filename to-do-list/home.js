const inputText = document.querySelector(".task-text");
const inputdate = document.querySelector(".task-date");
const addButton = document.querySelector(".add-btn");
const taskLists = document.querySelector(".task-list");
document.addEventListener('DOMContentLoaded', loadTasks);

addButton.addEventListener("click", () => {
  
  const taskText = inputText.value.trim();
  const dueDate = inputdate.value;
  
  //   if (taskText === '' || dueDate === '') {
  //     alert('Please enter both a task and a due date');
  //     return;
  //   }
  const task = {
    text: taskText,
    date: dueDate,
  };
  saveTaskToLocalStorage(task);
  
  createTaskElement(task);
  
  inputText.value = '';
  inputdate.value = '';  
});



function createTaskElement(task) {
  const li = document.createElement("li");

  const textElement = document.createElement("span");
  textElement.textContent = task.text;

  const dateElement = document.createElement("span");
  dateElement.classList.add("due-date");
  dateElement.textContent = `Due: ${formatDate(task.date)}`;

  const editElement = document.createElement("button");
  editElement.textContent = "Edit";
  editElement.classList.add("edit-btn");
  editElement.addEventListener("click", () => {editTask(textElement, dateElement, task)});

  const deleteElement = document.createElement("button");
  deleteElement.textContent = "Delete";
  deleteElement.classList.add("delete-btn");
  deleteElement.addEventListener("click", () =>{
    taskLists.removeChild(li)
    deleteTaskFromLocalStorage(task);
  });

  li.appendChild(textElement);
  li.appendChild(dateElement);
  li.appendChild(editElement);
  li.appendChild(deleteElement);

  taskLists.appendChild(li);
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  }

  function editTask(taskTextElement, dueDateElement, task) {
    const newTaskText = prompt('Edit Task:', taskTextElement.textContent);
    const newDueDate = prompt('Edit Due Date (YYYY-MM-DD):', task.date);
  
    if (newTaskText !== null && newTaskText.trim() !== '') {
      taskTextElement.textContent = newTaskText.trim();
      task.text = newTaskText.trim();
    }
  
    if (newDueDate !== null && newDueDate.trim() !== '') {
      dueDateElement.textContent = `Due: ${formatDate(newDueDate.trim())}`;
      task.date = newDueDate.trim();
    }
  
    // Update the task in localStorage
    updateTaskInLocalStorage(task);
  }
function saveTaskToLocalStorage(task){
    const memorys = getTasksFromLocalStorage()
    memorys.push(task)
    localStorage.setItem('memory', JSON.stringify(memorys))   
}
function loadTasks(){
    const tasks = getTasksFromLocalStorage();
    tasks.forEach((task) => {
        createTaskElement(task)
    })
}
function getTasksFromLocalStorage() {
    const tasks = localStorage.getItem('memory');
    return tasks ? JSON.parse(tasks) : [];
  }
function deleteTaskFromLocalStorage(taskToDelete) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.filter(task => task.text !== taskToDelete.text || task.dueDate !== taskToDelete.dueDate);
    localStorage.setItem('memory', JSON.stringify(tasks));
}
