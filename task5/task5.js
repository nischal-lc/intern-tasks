//! I was running previous js in node in cmd but this one needs browser. 

async function fetchEqData(){
    //? Defining variables
    const response = await fetch('./data.json');
    const data = await response.json();
    const countries = {};
    const maxMagnitudeObj  = data.reduce((accumulator, currentValue)=>{ //* Using Array reduce function to get the object with maximum magnitude
        return currentValue.magnitude > accumulator.magnitude ? currentValue : accumulator
    }, data[0]
    )
    
    //? Creating an object for countries and their repetation count
    data.forEach((item)=>{
        const country = item.country;
        if(countries[country]){
            countries[country]++;
        }else{
            countries[country] = 1;
        }
    })

    //* Retrieving the country with maximum repetition.. this code blocks returns ['CountryName', Count]
    max = Object.entries(countries).reduce((accumulator, currentValue) => {
        return currentValue[1] > accumulator[1] ? currentValue : accumulator
    }, Object.entries(countries)[0]);
    
    console.log(`The country that appears most frequently in the dataset: ${max[0]} which appears ${max[1]} times`);
    console.log(`The details of the earthquake record with the highest magnitude:`)
    console.table(maxMagnitudeObj);
    console.log(`The total count of earthquake records: ${data.length}`)
}

fetchEqData();