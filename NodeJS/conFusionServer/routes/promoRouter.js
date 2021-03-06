const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Promotions = require('../models/promotions');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());


promoRouter.route('/').get((req,res,next) => {
	Promotions.find({})
	.then((promotions) => {
		console.log("Everything's FINE");
		res.statusCode = 200;
		res.setHeader('Content-Type','applications/json');
		res.json(promotions);
	}, (err) => next(err))
	.catch((err) => next(err));
}).post((req,res,next) => {
	Promotions.create(req.body)
	.then((promotion) => {
		console.log('Promotion Created ', promotion);
		res.statusCode = 200;
		res.setHeader('Content-Type','applications/json');
		res.json(promotion);

	}, (err) => next(err))
	.catch((err) => next(err));
}).put((req,res,next) => {
	res.statusCode = 403; //403 - operation is not supported
	res.end('PUT operation is not supported');
}).delete((req,res,next) => {
	Promotions.remove({})
	.then((resp) => {
		res.statusCode = 200;
		res.setHeader('Content-Type','applications/json');
		res.json(resp);
	}, (err) => next(err))
	.catch((err) => next(err));
});

promoRouter.route('/:promoId').get((req, res, next) => {
	Promotions.findById(req.params.promoId)
	.then((promotion) => {
		res.statusCode = 200;
		res.setHeader('Content-Type','applications/json');
		res.json(promotion);
	}, (err) => next(err))
	.catch((err) => next(err));
}).post((req, res, next) => {
	res.statusCode = 403;
	res.end('POST operation is not supported');
}).put((req, res, next) => {
	Promotions.findByIdAndUpdate(req.params.promoId, {
		$set: req.body
	}, {new: true})
	.then((promotion) => {
		res.statusCode = 200;
		res.setHeader('Content-Type','applications/json');
		res.json(promotion);
	}, (err) => next(err))
	.catch((err) => next(err));
	
}).delete((req, res, next) => {
	Promotions.findByIdAndRemove(req.params.promoId)
	.then((resp) => {
		res.statusCode = 200;
		res.setHeader('Content-Type','applications/json');
		res.json(resp);
	}, (err) => next(err))
	.catch((err) => next(err));
});


module.exports = promoRouter;