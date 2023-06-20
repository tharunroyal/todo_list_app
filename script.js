// Initialize an empty array to store tasks
let tasks = [];

// Get necessary DOM elements
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');
const button = document.getElementById('btn');
const completeall = document.getElementById('complete-all');
const clearall = document.getElementById('clear-all')
var comptask = 0;
var completedtask = document.getElementById('c-count');



// Define a function to add a task to the DOM
function addTaskToDOM(task){
    const li  = document.createElement('li');
    li.innerHTML = `
        <input type="checkbox" id="${task.id}" ${task.done ? 'checked' : ''} class="custom-checkbox">
        <label for="${task.id}">${task.text}</label>
        <img src="image/trash-solid.svg" class="delete" data-id="${task.id}" />
    `;
    taskList.append(li);
}

// Define a function to render the task list
function renderList () {
    taskList.innerHTML = '';
    for(let i=0; i<tasks.length; i++){
        addTaskToDOM(tasks[i]);
    }
    tasksCounter.innerHTML = tasks.length
}

// Define a function to mark a task as complete
function markTaskAsComplete(taskId){
    const task = tasks.filter(function(task){
        return task.id === taskId
    });
    if(task.length >0){
        const currentTask =  task[0];
        if (currentTask.done) {
            currentTask.done = false;
            comptask--;
        } else {
            currentTask.done = true;
            comptask++;
        }
        renderList();
        completedtask.innerHTML = comptask ;
        showNotification('Task marked successfully');
    } else {
        showNotification('Could not mark the task');
    }
}


// Define a function to delete a task
function deleteTask(taskId){
    const newTasks = tasks.filter(function(task){
        return task.id !== taskId
    })
    tasks = newTasks;
    renderList();
    showNotification('Task deleted successfully')
    if(comptask > 0){
    comptask--;
    completedtask.innerHTML = comptask;
    }
}

// Define a function to add a task to the tasks array
function addTask(task){
    if(task){
        tasks.push(task);
        renderList();
        showNotification('Task added successfully');
        return;
    }else{
        showNotification('Task cannot be added');
     }
}

// Define a function to show a notification to the user
function showNotification(text){
    alert(text);
}

// Define a function to handle keypress and mousedown events on the input field
function handleInputKeypress(e){
    if(e.key == 'Enter' || e.type == 'mousedown'){
        const text = addTaskInput.value;
        if(!text){
            showNotification('Task text cannot be empty') ; 
            return;
        }
        const task = {
            text,
            id:Date.now().toString(),
            done:false
        }
        addTaskInput.value = ''; // Use addTaskInput instead of e.target
        addTask(task);
    }
}



function handleClickListener(e){
    const target = e.target;
    if(target.className === 'delete'){
        const taskId = target.dataset.id;
        deleteTask(taskId);
        return;
    }else if(target.className === 'custom-checkbox'){
        const taskId = target.id;
        markTaskAsComplete(taskId);
        return;
    }
}

function allComplete(){
    for(let i = 0; i < tasks.length; i++){
      tasks[i].done = true;
    }
    renderList();
    showNotification('All tasks marked as complete');
    completedtask.innerHTML = tasks.length;
}
  

function allclear(){
    const checkboxes = document.querySelectorAll('.custom-checkbox');
    checkboxes.forEach(function(checkbox){
        checkbox.checked = false;
    });
    tasks.forEach(function(task){
        task.done = false;
    });
    renderList();
    showNotification('All tasks cleared successfully');
    completedtask.innerHTML = 0;
}




function initializeApp(){
    document.addEventListener('click', handleClickListener);
    button.addEventListener('mousedown', handleInputKeypress); // Change event listener to 'mousedown'
    completeall.addEventListener('click', allComplete);
    clearall.addEventListener('click', allclear);
    
}

initializeApp();



// javascript on filtter data;


// get filter links
const allLink = document.getElementById('all');
const remLink = document.getElementById('rem');
const comLink = document.getElementById('com');

// add event listeners to filter links
allLink.addEventListener('click', showAllTasks);
remLink.addEventListener('click', showUncompletedTasks);
comLink.addEventListener('click', showCompletedTasks);

// function to show all tasks
function showAllTasks() {
    // remove "active" class from all links
    allLink.classList.add('active');
    remLink.classList.remove('active');
    comLink.classList.remove('active');
    // show all tasks
    const tasks = document.querySelectorAll('#list li');
    tasks.forEach(task => {
        task.style.display = 'flex';
        console.log(task);
    });
}

// function to show uncompleted tasks
function showUncompletedTasks() {
    // remove "active" class from all links
    allLink.classList.remove('active');
    remLink.classList.add('active');
    comLink.classList.remove('active');
    // hide completed tasks and show uncompleted tasks
    const tasks = document.querySelectorAll('#list li');
    tasks.forEach(task => {
        const checkbox = task.querySelector('.custom-checkbox');
        if (checkbox.checked) {
            task.style.display = 'none';
        } else {
            task.style.display = 'flex';
        }
    });
}

// function to show completed tasks
function showCompletedTasks() {
    // remove "active" class from all links
    allLink.classList.remove('active');
    remLink.classList.remove('active');
    comLink.classList.add('active');
    // hide uncompleted tasks and show completed tasks
    const tasks = document.querySelectorAll('#list li');
    tasks.forEach(task => {
        const checkbox = task.querySelector('.custom-checkbox');
        if (checkbox.checked) {
            task.style.display = 'flex';
        } else {
            task.style.display = 'none';
        }
    });
}



