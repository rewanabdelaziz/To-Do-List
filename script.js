// define the list array
let list = [];

// check local storage when DOM loaded
document.addEventListener("DOMContentLoaded",()=>{
    const storedTasks = JSON.parse(localStorage.getItem("tasks"))

    if(storedTasks){
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
    updateScore()
    updateTaskList()
    saveTasks();
}

// delete a task
const deleteTask = (i)=>{
    list.splice(i,1)
    updateScore()
    updateTaskList()
    saveTasks();
}

// edit a task
const editTask = (i)=>{
    const textInput = document.getElementById("taskInput");
    textInput.value=list[i].Text;
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
    progressBar.style.width = `${progressVal}%`
    // console.log(progressBar.style.width)
    const score = document.getElementsByClassName("score")[0]
    score.innerHTML = `${completedTasksNums} / ${totalTasks}`
}

// update your to do list 
const updateTaskList = ()=>{
    let taskList = document.getElementById("task-list"); // ul in html
    taskList.innerHTML = '';

    list.forEach( (task,index) => {
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

document.getElementById("newTask").addEventListener('click',function (e) {
    e.preventDefault()
    addNewTask();
})