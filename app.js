//a task list that will store tasks in local storage

//get elements
const form = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const tableBody = document.getElementById('table-body');
const clearBtn = document.getElementById('clear');

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
  clearBtn.addEventListener('click', clearTasks);
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
  if (taskInput.value === '') {
    alert('Please enter a task'); //change this for a better alert
  } else {
    taskList.push(new Task(taskInput.value));
    //write the task with the last one added to array
    writeTask(taskList[taskList.length - 1]);
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
        if (taskList[i].checkClass == '') {
          taskList[i].checkClass = 'checked';
        } else {
          taskList[i].checkClass = '';
        }
      }
    }
  }
  setLocal(taskList);
}

//clear all tasks
function clearTasks() {
  let confirmed = confirm('Remove all stored tasks?');
  if (confirmed === true) {
    //empty array
    taskList = [];
    //empty table
    tableBody.innerHTML = '';
    //clear local
    localStorage.clear();
  }
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