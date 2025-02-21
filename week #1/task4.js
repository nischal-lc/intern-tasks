// ? Variable declarations
let hasA = false;
const grades = ['A','B', 'C', 'D', 'F'];
const studentData = new Map();
const gradeBStudents = [];

//Generate random data
for (let i = 1; i <= 200; i++) {
    const randomGrade = grades[Math.floor(Math.random() * grades.length)];
    studentData.set(`Student${i}`, randomGrade);
}

//Checks the data as per condition
studentData.forEach((grade, name)=>{
    if(grade == "A" && !hasA) hasA = true;
    if(grade == "B") {gradeBStudents.push(name)}
})


console.log(hasA, gradeBStudents);