const express      = require('express');
const path         = require('path');
//const cors         = require('cors');
const socketIO 	   = require('socket.io')
const http         = require('http');
//const mongoose     = require('mongoose');
require('dotenv').config();

//const favicon      = require('serve-favicon');
//const logger       = require('morgan');
//const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
//const layouts      = require('express-ejs-layouts');
//const mongoose     = require('mongoose');
//const session      = require('express-session');
//const passport     = require('passport');
//const request      = require('request');
const port = 4200;

const app = express();

//Connect to DB
// mongoose.connect(process.env.MONGODB_URI);
//
// const corsOptions = {
// 	origin: 'http://localhost:3000',
// 	optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }

const server = http.createServer(app);
const io = socketIO(server);
io.set('origins', '*:*');

// This is what the socket.io syntax is like, we will work this later
io.on('connection', socket => {
	console.log('Socket.io: connected')

	socket.on('disconnect', () => {
		console.log('Socket.io: disconnected')
	})
})



//app.use(cors(corsOptions));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.locals.title = "Home Automation";

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use(layouts);

const index = require('./routes/index');
app.use('/', index);

const rest = require('./routes/rest')(io);
app.use('/rest', rest);
// app.get('/', (req, res, next) => {
// 	res.send("hello!");
// })
server.listen(port, () => console.log(`listening on ${port}`));
// catch 404 and forward to error handler
app.use((req, res, next) => {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use((err, req, res, next) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
