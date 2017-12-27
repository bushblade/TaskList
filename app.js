//a task list that will store tasks in local storage

//get elements
const form = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const tableBody = document.getElementById('table-body');
const clearBtn = document.getElementById('clear');

// store the tasks in an array
let taskList = ['Delete Me...'];

// load event listeners
init();

function init() {
  // document.addEventListener('DOMContentLoaded', getLocal());
  form.addEventListener('submit', addTask);
  clearBtn.addEventListener('click', clearTasks);
  tableBody.addEventListener('click', deleteTask);
  getLocal(taskList);
  taskList.forEach(writeTask);
}

//get task and push to taskList array
function addTask(e) {
  if (taskInput.value === '') {
    alert('Please enter a task'); //change this for a better alert
  } else {
    taskList.push(taskInput.value);
    writeTask(taskInput.value);
    taskInput.value = '';
  }
  e.preventDefault();
}

//populate tableBody with tasks from taskList
function writeTask(task) {
  const tr = document.createElement('tr');
  const a = '<a class="delete is-pulled-right"></a>';
  tr.innerHTML = `<td>${task}${a}</td>`;
  tableBody.appendChild(tr);
  setLocal(taskList);
}

//delete a task
function deleteTask(e) {
  if (e.target.classList.contains('delete')) {
    //remove it from the array
    let taskToRemove = taskList.indexOf(e.target.parentElement.textContent);
    taskList.splice(taskToRemove, 1);
    //remove it from the table
    e.target.parentElement.parentElement.remove();
  }
  setLocal(taskList);
}

//clear all tasks
function clearTasks() {
  //empty array
  taskList = [];
  //empty table
  tableBody.innerHTML = '';
  localStorage.clear();
}

//add local storage
//set local storage
function setLocal(array) {
  localStorage.setItem('tasks', JSON.stringify(array));
}
//get local storage
function getLocal(array) {
  if (localStorage.getItem('tasks') === null) {
    setLocal(array);
  } else {
    taskList = JSON.parse(localStorage.getItem('tasks'));
  }
}