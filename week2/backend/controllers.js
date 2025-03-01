const data = require('./earthquakeData.json');

const allData = (req, res) => {
    res.json(data);
}

const earthquakeId = (req, res) => {
    const id = req.params.id;
    const earthquakeOfId = data.find((earthquake)=>(earthquake.id === id));
    if(!earthquakeOfId){
        res.status(404).json({error: "Data not found"});
    }
    res.json(earthquakeOfId)
}

const addEarthquake = (req, res) => {
    const {country, magnitude, date} = req.body;
    if(!country || !magnitude || !date){
        return res.status(400).json({error: 'Please provide all required fields'});
    }
    const newId = parseInt(data[data.length - 1].id.slice(2) )+ 1;
    const newEathquake = {id: `eq${newId}`, country, magnitude, date}
    data.push(newEathquake);
    res.json({message: 'Earthquake added successfully'})
}

const editEarthquake = (req, res) => {
    const id = req.params.id;
    const {country, magnitude, date} = req.body;
    const earthquake = data.find((earthquake)=>(earthquake.id === id));
    if(!earthquake){
        res.status(404).json({error: "Data not found"});
    }
    earthquake.country = country;
    earthquake.magnitude = magnitude;
    earthquake.date = date;
    res.json({message: 'Earthquake updated successfully'});
}

const deleteEarthquake = (req, res) => {
    const id = req.params.id;
    const earthquake = data.find((eq)=>(eq.id === id));
    if(!earthquake){
        res.status(404).json({error: "Data not found"});
    }
    const index = data.indexOf(earthquake);
    data.splice(index, 1);
    res.json({message: "Data deleted successfully!"});
}

module.exports = {allData,earthquakeId,addEarthquake, editEarthquake,deleteEarthquake }