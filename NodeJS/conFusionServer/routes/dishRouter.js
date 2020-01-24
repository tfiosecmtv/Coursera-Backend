const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Dishes = require('../models/dishes');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/').get((req,res,next) => {
	Dishes.find({})
	.then((dishes) => {
		console.log("Everything's FINE");
		res.statusCode = 200;
		res.setHeader('Content-Type','applications/json');
		res.json(dishes);
	}, (err) => next(err))
	.catch((err) => next(err));
}).post((req,res,next) => {
	Dishes.create(req.body)
	.then((dish) => {
		console.log('Dish Created ', dish);
		res.statusCode = 200;
		res.setHeader('Content-Type','applications/json');
		res.json(dish);

	}, (err) => next(err))
	.catch((err) => next(err));
}).put((req,res,next) => {
	res.statusCode = 403; //403 - operation is not supported
	res.end('PUT operation is not supported');
}).delete((req,res,next) => {
	Dishes.remove({})
	.then((resp) => {
		res.statusCode = 200;
		res.setHeader('Content-Type','applications/json');
		res.json(resp);
	}, (err) => next(err))
	.catch((err) => next(err));
});

dishRouter.route('/:dishId').get((req, res, next) => {
	Dishes.findById(req.params.dishId)
	.then((dish) => {
		res.statusCode = 200;
		res.setHeader('Content-Type','applications/json');
		res.json(dish);
	}, (err) => next(err))
	.catch((err) => next(err));
}).post((req, res, next) => {
	res.statusCode = 403;
	res.end('POST operation is not supported');
}).put((req, res, next) => {
	Dishes.findByIdAndUpdate(req.params.dishId, {
		$set: req.body
	}, {new: true})
	.then((dish) => {
		res.statusCode = 200;
		res.setHeader('Content-Type','applications/json');
		res.json(dish);
	}, (err) => next(err))
	.catch((err) => next(err));
	
}).delete((req, res, next) => {
	Dishes.findByIdAndRemove(req.params.dishId)
	.then((resp) => {
		res.statusCode = 200;
		res.setHeader('Content-Type','applications/json');
		res.json(resp);
	}, (err) => next(err))
	.catch((err) => next(err));
});

module.exports = dishRouter;