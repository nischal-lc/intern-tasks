//! Defining variables
let temperatures = [32, 45, 50, 84, 90, 78, 68];

//? Function to calculate and sort the temperature
toCelsius = temperatures.map((item)=>(
    parseFloat(((item - 32)*5/9).toFixed(2))
)).sort((a,b)=> a-b); //? Sorts in ascending order

//? Extracting lowest three values 
lowestThree = toCelsius.slice(0,3)
console.log(lowestThree);