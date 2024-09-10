const { sendResponse, AppError } = require("../helpers/utils.js")

const mongoose = require('mongoose');
const Car = require('../models/Car');
const carController = {};

//CREATE - POST
carController.createCar = async (req, res, next) => {
	const {
		make,
		model,
		release_date,
		transmission_type,
		size,
		style,
		price, } = req.body
	const info = {
		make,
		model,
		release_date,
		transmission_type,
		size,
		style,
		price,
	}

	try {
		// YOUR CODE HERE
		//always remember to control your inputs
		if (!make ||
			!model ||
			!release_date ||
			!transmission_type ||
			!size ||
			!style ||
			!price) throw new AppError(400, "Bad Request", "Create Car Error")
		//mongoose query
		const created = await Car.create(info)


		sendResponse(res, 200, true, created, null, "Create Car Successfully!")
	} catch (err) {
		// YOUR CODE HERE
		next(err)
	}
};

//READ - GET
carController.getCars = async (req, res, next) => {

	// empty filter mean get all
	const filter = {}
	try {
		// YOUR CODE HERE
		let { page, limit } = req.query;
		page = parseInt(page) || 1;
		limit = parseInt(limit) || 10;
		total = Math.ceil(11914 / limit)
		//Number of items skip for selection
		let offset = limit * (page - 1);
		//mongoose query
		let listOfFound = await Car.find(filter)
		listOfFound = listOfFound.slice(offset, offset + limit);
		sendResponse(res, 200, true, listOfFound, null, "Create Car List Successfully!", page, total)
	} catch (err) {
		// YOUR CODE HERE
		next(err)
	}
};

//UPDATE - PUT
carController.editCar = async (req, res, next) => {
	const { targetId } = req.params
	const updateInfo = req.body

	//options allow you to modify query. e.g new true return lastest update of data
	const options = { new: true }
	try {
		//mongoose query
		const updated = await Car.findByIdAndUpdate(targetId, updateInfo, options)
		sendResponse(res, 200, true, updated, null, "Update Car success")
	} catch (err) {
		// YOUR CODE HERE
		next(err)
	}
};

//DELETE - DELETE
carController.deleteCar = async (req, res, next) => {
	//in real project you will getting id from req. For updating and deleting, 
	//it is recommended for you to use unique identifier such as _id to avoid duplication

	// empty target mean delete nothing
	const { targetId } = req.params
	const options = { new: true }
	try {
		// YOUR CODE HERE
		//mongoose query
		const updated = await Car.findByIdAndDelete(targetId, options)

		sendResponse(res, 200, true, { data: updated }, null, "Delete foo success")
	} catch (err) {
		// YOUR CODE HERE
		next(err)
	}
};

module.exports = carController;
