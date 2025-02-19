function createCode(name, dob) {
    firstPart = name.slice(0,3).toUpperCase(); //? Getting 3 characters of the name and uppercasing it
    year = dob.split("-")[0]; //* Getting the year from dob
    secondPart = year.slice(year.length - 2, year.length); //* Getting last 2 part of the year
    return `${firstPart}${secondPart}`; //? Returning the code
}

console.log(createCode("John", "1990-10-20"));