//a task list that will store tasks in local storage

//get elements
const form = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const tableBody = document.getElementById('table-body');
const clearBtn = document.getElementById('clear');
const modal = document.querySelector('.modal');
const modalMessage = document.querySelector('#message');
const cancelBtn = document.getElementById('cancelBtn');
const confirmBtn = document.getElementById('confirmBtn');
const okBtn = document.getElementById('okBtn');

// store the tasks in an array
let taskList = [{
    task: 'Delete me....',
    checkClass: ''
  },
  {
    task: 'Checked example',
    checkClass: 'checked'
  }
];

// load event listeners
(function () {
  // document.addEventListener('DOMContentLoaded', getLocal());
  form.addEventListener('submit', addTask);
  clearBtn.addEventListener('click', function(){warning('Remove all tasks from storage?', true);});
  tableBody.addEventListener('click', deleteOrCheck);
  getLocal(taskList);
  taskList.forEach(writeTask);
})();

//new task constructor
function Task(task, checkClass = '') {
  this.task = task;
  this.checkClass = checkClass;
}


//get task and push to taskList array
function addTask(e) {
  if (taskInput.value.replace(/\s/g, "").length > 0) {
    taskList.push(new Task(taskInput.value));
    //write the task with the last one added to array
    writeTask(taskList[taskList.length - 1]);
    taskInput.value = '';
  } else {
    warning('No text has been entered.');
    taskInput.value = '';
  }
  e.preventDefault();
}

//populate tableBody with tasks from taskList
function writeTask(task) {
  const tr = document.createElement('tr');
  const a = '<a class="delete is-pulled-right"></a>';
  tr.innerHTML = `<td class="${task.checkClass}">${task.task}${a}</td>`;
  tableBody.appendChild(tr);
  setLocal(taskList);
}

//delete or check a task
function deleteOrCheck(e) {
  //delete task
  if (e.target.classList.contains('delete')) {
    let taskText = e.target.parentElement.textContent;
    //remove it from the array
    for (i = 0; i < taskList.length; i++) {
      if (taskList[i].task === taskText) {
        taskList.splice(i, 1);
      }
    }
    //remove from dom
    e.target.parentElement.parentElement.remove();
  }
  // check task
  else if (e.target.localName === 'td') {
    e.target.classList.toggle('checked');
    let taskText = e.target.textContent;
    for (i = 0; i < taskList.length; i++) {
      if (taskList[i].task === taskText) {
        taskList[i].checkClass = taskList[i].checkClass === '' ? 'checked' : '';
      }
    }
  }
  setLocal(taskList);
}

//clear all tasks
function clearTasks() {  
    //empty array
    taskList = [];
    //empty table
    tableBody.innerHTML = '';
    //clear local
    localStorage.clear();  
    modalToggle();
}

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


function warning(message, buttons = false) {
  document.getElementById('close').addEventListener('click', modalToggle);
  document.querySelector('.modal-close').addEventListener('click', modalToggle);
  modalMessage.innerHTML = `${message}`;
  modalToggle();
  if (buttons === true){
    cancelBtn.style.display = 'inline-block';
    confirmBtn.style.display = 'inline-block';
    okBtn.style.display = 'none';
  }else{
    cancelBtn.style.display = 'none';
    confirmBtn.style.display = 'none';
    okBtn.style.display = 'inline-block';
  }
  cancelBtn.addEventListener('click', modalToggle);
  okBtn.addEventListener('click', modalToggle);
  confirmBtn.addEventListener('click', clearTasks);
}

function modalToggle() {
  modal.classList.toggle('is-active');
}