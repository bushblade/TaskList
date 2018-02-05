//get elements
const form = document.getElementById('task-form'),
  taskInput = document.getElementById('task-input'),
  tableBody = document.getElementById('table-body'),
  clearBtn = document.getElementById('clear'),
  modal = document.querySelector('.modal'),
  modalMessage = document.querySelector('#message'),
  cancelBtn = document.getElementById('cancelBtn'),
  confirmBtn = document.getElementById('confirmBtn'),
  okBtn = document.getElementById('okBtn'),
  modalToggle = () => modal.classList.toggle('is-active'),
  toggleChecked = x => x.checkClass === '' ? x.checkClass = 'checked' : x.checkClass = '';

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

(function () {
  getLocal(taskList);
  taskList.forEach(writeTask);
})();

form.addEventListener('submit', addTask);
clearBtn.addEventListener('click', () => warning('Remove all tasks from storage?', true));
tableBody.addEventListener('click', deleteOrCheck);
document.getElementById('close').addEventListener('click', () => modalToggle());
document.querySelector('.modal-close').addEventListener('click', () => modalToggle());
modal.addEventListener('click', x => x.target.classList.contains('modal-background') ? modalToggle() : false);
cancelBtn.addEventListener('click', modalToggle);
okBtn.addEventListener('click', modalToggle);
confirmBtn.addEventListener('click', clearTasks);

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
    taskList = taskList.filter(thisTask => thisTask.task !== taskText);
    //remove from dom
    e.target.parentElement.parentElement.remove();
  }
  // check task
  else if (e.target.localName === 'td') {
    e.target.classList.toggle('checked');
    let taskText = e.target.textContent;
    taskList.forEach(thisTask => thisTask.task === taskText ? toggleChecked(thisTask) : false);
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
  modalMessage.innerHTML = `${message}`;
  modalToggle();
  //if clear button clicked
  if (buttons === true) {
    cancelBtn.style.display = 'inline-block';
    confirmBtn.style.display = 'inline-block';
    okBtn.style.display = 'none';
    //if there was an empty task
  } else {
    cancelBtn.style.display = 'none';
    confirmBtn.style.display = 'none';
    okBtn.style.display = 'inline-block';
  }
}