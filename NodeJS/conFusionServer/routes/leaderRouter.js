const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/').all((req, res, next) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	next();

}).get((req, res, next) => {
	res.end('Will send all the leaders to you!');
}).post((req, res, next) => {
	res.end('Will add the leader: ' + req.body.name + ' with details: ' + req.body.description);
}).put((req, res, next) => {
	res.statusCode = 403;
	res.end('PUT operation is not supported');
}).delete((req, res, next) => {
	res.end('Deleting all the leaders');
});

leaderRouter.route('/:leaderId').all((req, res, next) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	next();
}).get((req, res, next) => {
	res.end('Will send the leader to you! ' + req.params.leaderId);
}).post((req, res, next) => {
	res.statusCode = 403;
	res.end('POST operation is not supported');
}).put((req, res, next) => {
	res.end('Will update the leader: ' + req.body.name + ' with details: ' + req.body.description);
	
}).delete((req, res, next) => {
	res.end('Deleting the leader ' + req.params.leaderId);
});

module.exports = leaderRouter;

