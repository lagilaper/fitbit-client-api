var express = require('express');
var app = express();
var Fitbit = require('./../lib');

var clientId = 'CLIENT_ID';
var clientSecret = 'CLIENT_SECRET';

var fitbit = new Fitbit(clientId, clientSecret);

var redirect_uri = 'http://localhost:3000/auth/fitbit/callback';

var tokenObj = {
		access_token: 'ACCESS_TOKEN',
		refresh_token: 'REFRESH_TOKEN',
		expires_in: 3600,
		expires_at: "2015-11-29T03:06:06.672Z"
};


app.get( '/profile', function( req, res, next ) {
	fitbit.getProfile(tokenObj, function (err, result) {
		if (err) { return res.status(500).send(err) ; }

		res.json(result);
	});
});


app.get( '/activities/:category', function( req, res, next ) {
	var options = {
		resourcePath: 'activities/' + req.params.category,
		baseDate: '2015-11-10',
		period: '30d',
		endDate: '2015-11-01',
		userId: '-'
	};

	fitbit.getTimeSeries(tokenObj, options, function (err, result) {
		if (err) { return res.status(500).send(err) ; }

		res.json(result);
	});
});


app.get( '/refresh_token', function( req, res, next ) {
	fitbit.refreshToken(tokenObj, function (err, token) {
		if (err) { return res.status(500).send(err) ; }

		res.send(token)
	});
});

// BASIC API
app.get ( '/sleep', function ( req, res, next ) {
	var options = {
		path: '/sleep/date/2015-10-10.json',
		userId: '-'
	};

	fitbit.get( tokenObj, options, function (err, result){
		if (err) { return res.status(500).send(err) ; }

		res.json(result);
	});
});

app.post( '/water', function( req, res, next ) {
	var data = {
		waterLog: {
			"logId": 15444,
			"amount": 300
		}
	};

	var options = {
		path: '/foods/log/water.json',
		userId: '-'
	};

	fitbit.post( tokenObj, options, data, function (err, result){
		if (err) { return res.status(500).send(err) ; }

		res.json(result);
	});
});


app.listen(3000);
