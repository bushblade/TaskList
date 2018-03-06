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

let taskList = [{
    task: 'Delete me....',
    checkClass: ''
  },
  {
    task: 'Checked example',
    checkClass: 'checked'
  }
];

getLocal(taskList);
taskList.forEach(writeTask);

clearBtn.addEventListener('click', () => warning('Remove all tasks from storage?', true));
document.getElementById('close').addEventListener('click', modalToggle);
document.querySelector('.modal-close').addEventListener('click', modalToggle);
modal.addEventListener('click', x => x.target.classList.contains('modal-background') ? modalToggle() : false);
cancelBtn.addEventListener('click', modalToggle);
okBtn.addEventListener('click', modalToggle);

form.addEventListener('submit', e => {
  if (taskInput.value.replace(/\s/g, "").length > 0) {
    taskList.push(new Task(taskInput.value));
    writeTask(taskList[taskList.length - 1]);
    taskInput.value = '';
  } else {
    warning('No text has been entered.');
    taskInput.value = '';
  }
  e.preventDefault();
})

tableBody.addEventListener('click', e => {
  if (e.target.classList.contains('delete')) {
    let taskText = e.target.parentElement.textContent;
    taskList = taskList.filter(thisTask => thisTask.task !== taskText);
    e.target.parentElement.parentElement.remove();
  }
  else if (e.target.localName === 'td') {
    e.target.classList.toggle('checked');
    let taskText = e.target.textContent;
    taskList.forEach(thisTask => thisTask.task === taskText ? toggleChecked(thisTask) : false);
  }
  setLocal(taskList);
})

confirmBtn.addEventListener('click', () => {
  taskList = [];
  tableBody.innerHTML = '';
  localStorage.clear();
  modalToggle();
})

function Task(task, checkClass = '') {
  this.task = task;
  this.checkClass = checkClass;
}

function writeTask(task) {
  const tr = document.createElement('tr');
  const a = '<a class="delete is-pulled-right"></a>';
  tr.innerHTML = `<td class="${task.checkClass}">${task.task}${a}</td>`;
  tableBody.appendChild(tr);
  setLocal(taskList);
}

function setLocal(array) {
  localStorage.setItem('tasks', JSON.stringify(array));
}

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
  if (buttons === true) {
    cancelBtn.style.display = 'inline-block';
    confirmBtn.style.display = 'inline-block';
    okBtn.style.display = 'none';
  } else {
    cancelBtn.style.display = 'none';
    confirmBtn.style.display = 'none';
    okBtn.style.display = 'inline-block';
  }
}