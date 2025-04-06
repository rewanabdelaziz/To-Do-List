// define the list array
let list = [];
let listToShow = list;

// check local storage when DOM loaded
document.addEventListener("DOMContentLoaded",()=>{
    const storedTasks = JSON.parse(localStorage.getItem("tasks"))
    if(storedTasks.length){
        const tabs = document.getElementsByClassName('tabs')[0];
        tabs.classList.remove('hidden');
        storedTasks.forEach((task)=> list.push(task))
        updateTaskList()
        updateScore()
    }
    
})

// set list to the local storage
const saveTasks = () =>{
    localStorage.setItem('tasks', JSON.stringify(list));
}

// add new task function
function addNewTask(){
    const textInput = document.getElementById("taskInput");
    const text = textInput.value.trim();

    if(text){
    list.push({Text: text, Done: false});
    text.value = '';
    textInput.value="";
    // console.log(list);
    updateTaskList();
    updateScore();
    saveTasks();
    }
    
}

// change task's Done value (completed or not) ,every change on checkbox
const toggleTaskComplete = (i) =>{
    list[i].Done = !list[i].Done;
    // console.log(list[i])
    updateTaskList()
    updateScore()
    saveTasks();
}

// delete a task
const deleteTask = (i)=>{
    list.splice(i,1)
    updateTaskList()
    updateScore()
    saveTasks();
}

// edit a task
const editTask = (i)=>{
    const textInput = document.getElementById("taskInput");
    textInput.value=list[i].Text;
    textInput.focus();
    list.splice(i,1)
    updateTaskList()
    updateScore()
    saveTasks();
}

// update your score 
const updateScore = ()=>{
    const completedTasksNums = list.filter( (task) => task.Done).length;
    const totalTasks = list.length;
    const progressVal = (completedTasksNums/totalTasks) *100
    const progressBar = document.getElementsByClassName("bar")[0]
    const score = document.getElementsByClassName("score")[0]
    score.innerHTML = `${completedTasksNums} / ${totalTasks}`
    if(totalTasks){
        progressBar.style.width = `${progressVal}%`
    }else{
        progressBar.style.width = '0%'
    }
    
}
// handle list's tabs
let all =true;
let completed = false;
let notCompleted = false;

document.getElementById("all").addEventListener('click',function (e) {
    e.preventDefault()
    all =true;
    completed = false;
    notCompleted = false;
    document.querySelectorAll('.tabs button').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active')
    updateTaskList();
})

document.getElementById("completed").addEventListener('click',function (e) {
    e.preventDefault()
    all = false;
    completed = true;
    notCompleted = false;
    document.querySelectorAll('.tabs button').forEach(btn => btn.classList.remove('active'));
    // console.log(document.querySelectorAll('.tabs button'))
    e.target.classList.add('active');
    updateTaskList();
})
document.getElementById("not-completed").addEventListener('click',function (e) {
    e.preventDefault()
    all = false;
    completed = false;
    notCompleted = true;
    document.querySelectorAll('.tabs button').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    updateTaskList();
})

// update your to do list 
const updateTaskList = ()=>{

    // show tabs
    const tabs = document.getElementsByClassName('tabs')[0];
    if(list.length){
        tabs.classList.remove('hidden');
    }else{
        tabs.classList.add('hidden');
    }

    // update list
    let taskList = document.getElementById("task-list"); // ul in html
    taskList.innerHTML = '';
    const completedTasks = list.filter( (task) => task.Done);
    const NotcompletedTasks = list.filter( (task) => !task.Done);
    
    
    if(completed === true){
        listToShow = completedTasks;
    } else if(notCompleted === true){
        listToShow = NotcompletedTasks;
    }else{
        listToShow =list;
    }

    listToShow.forEach( (task) => {
        const index = list.indexOf(task); // get index of element in original list to use in add ,delete and toggle functions

        const listItem = document.createElement('li');
        listItem.innerHTML = `
        <div class="taskItem">
                <div class="task ${task.Done ? "completed" : ""}" >
                    <input type="checkbox" class="checkbox" ${task.Done ? "checked" : ""}>
                    <p>${task.Text}</p>
                </div>
                <div class="icons">
                    <img src="./images/edit.png" alt="edit icon" onclick="editTask(${index})" >
                    <img src="./images/bin.png" alt="bin icon" onclick="deleteTask(${index})" >
                </div>
            </div>
        `;

        listItem.addEventListener("change", () => toggleTaskComplete(index))

        taskList.append(listItem);

    })

    
}

// add new task event
document.getElementById("newTask").addEventListener('click',function (e) {
    e.preventDefault()
    addNewTask();
})