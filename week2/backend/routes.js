const express = require('express');
const router = express.Router();
const {allData,earthquakeId,addEarthquake, editEarthquake, deleteEarthquake } = require('./controllers');

router.get('/', allData);
router.get('/:id', earthquakeId);
router.post('/', addEarthquake);
router.delete('/:id', deleteEarthquake)
router.put('/:id', editEarthquake );

module.exports = router;