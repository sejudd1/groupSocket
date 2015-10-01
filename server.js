//DECLARING VARIABLES
var express = require( 'express' );
var app     = express();
var http    = require( 'http' ).Server( app );
var io      = require( 'socket.io' )( http );
var Twit    = require( 'twit' );
var port    = 3000;

//Twitter object
var twitter = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

//Home Route
app.get( '/', function( req, res ) {
	res.sendFile( __dirname + '/views/index.html' );
} );

//Socket Connections
io.on('connection', function( socket ) {
	console.log('a user connected');


	//Sends and logs messages
  socket.on( 'chat message', function( msg ) {
    console.log( 'message: ' + msg );
    io.emit( 'chat message', msg );
  } );	
  	
	 
  //Logs when a user disconnects
  socket.on( 'disconnect', function() {
    console.log( 'user disconnected' );
  } );
} );


//Server running on port
http.listen( port, function( ) {
	console.log( 'Server running on port ' + port );
} );