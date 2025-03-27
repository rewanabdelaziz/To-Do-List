document.addEventListener("DOMContentLoaded",()=>{
    const storedTasks = JSON.parse(localStorage.getItem("tasks"))

    if(storedTasks){
        storedTasks.forEach((task)=> list.push(task))
        updatetaskList()
        updateScore()
    }
})

let list = [];

const saveTasks = () =>{
    localStorage.setItem('tasks', JSON.stringify(list));
}

function addNewTask(){
    const textInput = document.getElementById("taskInput");
    const text = textInput.value.trim();

    if(text){
    list.push({Text: text, Done: false});
    text.value = '';
    console.log(list);
    updatetaskList();
    updateScore();
    saveTasks();
    }
    
}

const toggleTaskComplete = (i) =>{
    list[i].Done = !list[i].Done;
    console.log(list[i])
    updateScore()
    updatetaskList()
    saveTasks();
}

const deleteTask = (i)=>{
    list.splice(i,1)
    updateScore()
    updatetaskList()
    saveTasks();
}

const editTask = (i)=>{
    const textInput = document.getElementById("taskInput");
    textInput.value=list[i].Text;
    list.splice(i,1)
    updatetaskList()
    updateScore()
    saveTasks();
}

const updateScore = ()=>{
    const completedTasks = list.filter( (task) => task.Done).length;
    const totalTasks = list.length;
    const progressVal = (completedTasks/totalTasks) *100
    const progressBar = document.getElementsByClassName("bar")[0]
    progressBar.style.width = `${progressVal}%`
    // console.log(progressBar.style.width)
    const score = document.getElementsByClassName("score")[0]
    score.innerHTML = `${completedTasks} / ${totalTasks}`
}

const updatetaskList = ()=>{
    let taskList = document.getElementById("task-list");
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