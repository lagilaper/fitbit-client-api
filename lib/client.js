var request = require('request');
var assign = require('object-assign');
var moment = require('moment')

var config = require('./config');
var api = require('./api');


var Fitbit = function(clientId, clientSecret) {
    this.config = assign({
        clientId,
        clientSecret
    }, config)
}

Fitbit.prototype.refreshToken = function(tokenObj, cb){
    var self = this;

    request({
        uri: self.config.FITBIT_BASE_API_URL +  self.config.FITBIT_TOKEN_PATH,
        method: 'POST',
        headers: { Authorization: 'Basic ' +  new Buffer(self.config.clientId + ':' + self.config.clientSecret).toString('base64') },
        form: {
            grant_type: 'refresh_token',
            refresh_token: tokenObj.refresh_token
        }
    }, function( err, res, body ) {
        if ( err ) return cb( new Error( 'token refresh: ' + err.message ) );

        if (res.statusCode > 300) {
            return cb(JSON.parse( body ));
        }

        try {
            var token = JSON.parse( body );
            token.expires_at = moment().add( token.expires_in, 'seconds' ).toDate();
            cb( null, token );
        } catch( err ) {
            cb( err );
        }
    });
}

Fitbit.prototype.getRequest = function(tokenObj, options, cb) {
    var acceptLanguage = options.units === 'METRIC' ? 'en_GB': 'en_US' ;
    var Authorization = 'Bearer ' + tokenObj.access_token;

    options = assign({
        url: options.url,
        method: 'GET',
        json: true,
        headers: {
            Authorization: Authorization,
            'Accept-Language': acceptLanguage
        }
    }, options);

    delete options.units;

    request(options, function(err, res, body){
        if (err) { return cb (err); }

        body = assign({
            limits: {
                limit: res.headers[ 'fitbit-rate-limit-limit' ],
                remaining: res.headers[ 'fitbit-rate-limit-remaining' ],
                reset: res.headers[ 'fitbit-rate-limit-reset' ]
            }
        }, body)

        return cb(undefined, body);
    });
}

Fitbit.prototype.getProfile = function (tokenObj, cb){
    var self = this;

    var options = {
        uri: self.config.FITBIT_BASE_API_URL + self.config.FITBIT_PROFILE_PATH
    }

    return self.getRequest(tokenObj, options, cb);
}

Fitbit.prototype.getTimeSeries = function(tokenObj, reqObj, cb) {
    var self = this;

    var options = {
        url: api.buildTimeSeriesUrl(reqObj)
    }

    return self.getRequest(tokenObj, options, cb)
}

module.exports = Fitbit;
