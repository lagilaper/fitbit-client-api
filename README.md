Fitbit Client API

Client library to call the Fitbit API using OAuth2.

## DISCLAIMER
Please note that this library doesn't provide any oauth2 method for Fitbit yet. Only provides refresh token functionality.

## TOKEN OBJECT
Each API method requires valid Fitbit API in the following format 

 * `access_token`: a valid user's access token.
 * `refresh_token`: the user's refresh token.
 * `expires_in`: Expiration time in SECONDS.
 * `expires_at`: Date time of expiration in ISODate format


## API
#### `new Fitbit(ClientID, ClientSecret)`
Constructor.

#### `getProfile(tokenObj, callback)`
Get user's profile based on his credentials

#### `getTimeSeries(tokenObj, requestObj, callback)`
Get time series data based on user's scope and specified resource-path
RequestObj is an object that contains resource-specific data that follow Fitbit spec in the following format :
 * `resourcePath`: valid resource path.
 * `baseDate`: Range start date. Default value is `today`.
 * `endDate`: Range end date.
 * `period`: The range for which data will be returned. Default value is `7d`. If `endDate` is specified, `endDate` will be used instead of period.

#### `refreshToken(tokenObj, callback)`
Refreshing access token from users. Result will be token object with user_id and current API scope.



