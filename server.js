const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const path = require('path')
const db = require('./db');
const users = require('./routes/user')
const streams = require('./routes/streams')
const rtsp = require('./routes/rtsp')
const VideoStream =require('./node-rtsp-stream-es6')
const webSocket = require('ws');

mongoose
	.connect(
		db.DB,
		{ useNewUrlParser: true }
	)
	.then(() => {
		console.log('Database is connected')
	})
	.catch(err => {
		console.log('Can not connect to the database:', err)
	})

const app = express()

app.use(passport.initialize())
require('./passport')(passport)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, '/public')))

// Routes
app.use('/api/users', users)
app.use('/api/streams', streams)
app.use('/api/rtsp', rtsp)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
	console.log(`Server is running on PORT ${PORT}`)
})


var option = {
	headers: {
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
		"Access-Control-Allow-Headers": "Content-Type"
	},
	port: 9999
};
var ws = new webSocket.Server(option)


         const options = {
            name: 'streamName',
            url: 'rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov',
            port: 9999
          }
      
          
          var vs = new VideoStream(ws, options)
          vs.start()

		  module.exports.ws = ws;
		  module.exports.vs = vs;