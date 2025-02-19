// ! Defining function to add task
function addTask(tasks, newTask, callback){
    tasks.push(newTask); // * Adding new task to the old tasks array
    const summary = {
        total: tasks.length,
        completed: tasks.filter(task => task.completed).length,
        pending: tasks.filter(task => !task.completed).length
    }
    // Triggering Callback function
    callback(tasks, summary);
}


//! Defining Started Data
let starterData =  [
    { id: 1, title: 'Complete assignment', completed: false },
    { id: 2, title: 'Attend meeting', completed: true }
];

//? Calling the function
addTask(starterData, { id: 3, title: 'Start project', completed: false }, (updatedTasks, summary) => {
    console.log("Updated Task List:", updatedTasks);
    console.log("Summary:", summary);
});