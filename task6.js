//! Creating an function that returns a promise after 2s of delay
function fetchUserData(){
    const userData = [
        { id: 1, name: "Alice", active: true },
        { id: 2, name: "Bob", active: false },
        { id: 3, name: "Charlie", active: true },
        { id: 4, name: "David", active: false },
        { id: 5, name: "Eva", active: true },
        { id: 6, name: "Frank", active: true },
        { id: 7, name: "Grace", active: false },
        { id: 8, name: "Hannah", active: true },
        { id: 9, name: "Ian", active: false },
        { id: 10, name: "Jane", active: true }
       ];
       
        return new Promise(resolve=>setTimeout(()=>resolve(userData), 2000));
}

//? An asyncronous function that awaits a promise that above function  returns.. it waits 
//? till the promise  is resolved or rejected
async function processUserData() {
    const response = await fetchUserData();
    const totalUsers = response.length;
    activeUsers  = 0;
    response.forEach((item)=>{
        if(item.active) activeUsers++; //? Iterating over and counting the no of active users
    })
    console.log(`Total users: ${totalUsers}, Active users: ${activeUsers}`);
}

processUserData();