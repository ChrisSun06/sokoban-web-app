/* server.js - user & resource authentication */
const log = console.log
const cors = require('cors')
var path = require('path');
const express = require('express')
const cookieParser = require('cookie-parser')
var session = require('express-session')
const jwt = require('jsonwebtoken');
const { mongoose } = require('./db/mongoose')
const { ObjectID } = require('mongodb')
const { User } = require('./models/user')
const { Game } = require('./models/game')
const bodyParser = require('body-parser') 
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

// starting the express server

let rooms = 0;

let players = {}
let rooms_info = {}

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

mongoose.set('useFindAndModify', false); // for some deprecation issues

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

// body-parser: middleware for parsing HTTP JSON body into a usable object



/*** Session handling **************************************/
// Create a session cookie
app.use(session({
    secret: 'oursecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 86400 * 1000,
        httpOnly: true
    }
}));
// Our own express middleware to check for 
// an active user on the session cookie (indicating a logged in user.)
const sessionChecker = (req, res, next) => {
    if (req.session.user) {
        res.redirect('/dashboard'); // redirect to dashboard if logged in.
    } else {
        next(); // next() moves on to the route.
    }    
};

// A route to login and create a session
app.post('/users/login', (req, res) => {
	const email = req.body.email
    const password = req.body.password
    // Use the static method on the User model to find a user
	// by their email and password
	User.findByEmailPassword(email, password).then((user) => {
	    if (!user) {
            console.log("failed")
            //res.redirect('/login');
            res.send(false)
        } else {
            // Add the user's id to the session cookie.
            // We can check later if this exists to ensure we are logged in.
            //req.session.user = user._id;
            console.log("not failed!")
			//req.session.email = user.email
			res.cookie('id',user._id, { maxAge: 900000, httpOnly: true });
			res.send(true)
        }
    }).catch((error) => {
		console.log(error)
		console.log("asd")
        res.status(400).send(error)
    })
})

// A route to logout a user
app.get('/users/logout', (req, res) => {
	// Remove the session
	req.session.destroy((error) => {
		if (error) {
			res.status(500).send(error)
		} else {
			res.redirect('/')
		}
	})
})

app.get('/users/getInfo', (req, res) => {
	const id = req.cookies["id"]
	// Based on this cookie's id, we set up information for the user.
	User.findById(id).then((user) => {
	    if (!user) {
            console.log("failed")
            //res.redirect('/login');
            res.send(false)
        } else {
            console.log("not failed!")
			res.send(user.email)
        }
    }).catch((error) => {
		console.log(error)
		console.log("asd")
        res.status(400).send(error)
    })
})

app.get('/users/getRoomInfo', (req, res) => {
	const id = req.cookies["id"]
	// Based on this cookie's id, we set up information for the user.
	User.findById(id).then((user) => {
	    if (!user) {
            console.log("failed")
            //res.redirect('/login');
            res.send(false)
        } else {
			console.log("not failed!")
			k = players[user.email]
			res.send(k)
        }
    }).catch((error) => {
		console.log(error)
		console.log("asd")
        res.status(400).send(error)
    })
})

/** User routes below **/
// Set up a POST route to *create* a user of your web app (*not* a student).
app.post('/users', (req, res) => {

	// Create a new user
	const user = new User({
		email: req.body.email,
		password: req.body.password
	})

	// Save the user
	user.save().then((user) => {
        res.send(user)
	}, (error) => {
		res.status(400).send(error) // 400 for bad request
	})
})

app.post('/users/newGame', (req, res) => {
	const game = new Game({
		game_name: "a1",
		creater: req.body.creater,
		preview_image: './GameLobby/sokobanpreview3.jpeg',
		game: null
	})

	const gamedata = {
		num_rows: req.body.num_rows,
		num_cols: req.body.num_cols,
		goals: req.body.goals,
		boxes: req.body.boxes,
		walls: 
			req.body.walls,
		players: req.body.players
	}

	console.log(gamedata)

	game.game = gamedata

	// Save the user
	game.save().then((rest) => {
        res.send(rest)
	}, (error) => {
		console.log(error)
		res.status(400).send(error) // 400 for bad request
	})
})

// Middleware for authentication of resources
const authenticate = (req, res, next) => {
	if (req.session.user) {
		User.findById(req.session.user).then((user) => {
			if (!user) {
				return Promise.reject()
			} else {
				req.user = user
				next()
			}
		}).catch((error) => {
			res.status(401).send("Unauthorized")
		})
	} else {
		res.status(401).send("Unauthorized")
	}
}

/* The Socket I/O calls below *******************************/
io.on('connection', function (socket) {
	socket.on('createGame', function(data){
		rooms++;
		rooms_info[rooms] = {"player1": data.name, owner: data.name}
		socket.emit('newGame', {name: data.name, room: rooms, isowner: true});
		players[data.name] = {name: data.name, room: rooms, isowner: true}
		
	});
	socket.on('joinGame', function(data){
		roomInt = parseInt(data.room)
		rooms_info[roomInt]["player2"] = data.name
		let opp = null
		for (const [key, value] of Object.entries(players)) {
			if(value.room === parseInt(data.room)){
				opp = key
			}
		}
		socket.broadcast.emit('newPlayer', {name: data.name, room: data.room, isowner: false});
		players[data.name] = {name: data.name, room: data.room, isowner: false, opponent: players[opp]}
	});
	socket.on('startGame', function(data){
		socket.broadcast.emit('gameStarted', {gameId: rooms_info[data.room].gameId});
	})
});



/**
 * Connect the Player 2 to the room he requested. Show error if room full.
 */


/*** Webpage routes below **********************************/
// Inject the sessionChecker middleware to any routes that require it.
// sessionChecker will run before the route handler and check if we are
// logged in, ensuring that we go to the dashboard if that is the case.

// The various redirects will ensure a proper flow between login and dashboard
// pages so that your users have a proper experience on the front-end.

// route for root: should redirect to login route
app.get('/', sessionChecker, (req, res) => {
	res.sendFile(path.join(__dirname, './../frontend/public', 'index.html'))
})

// login route serves the login page
app.get('/login', sessionChecker, (req, res) => {
	//res.sendFile(__dirname + '/public/login.html')
	// render the handlebars template for the login page
	//res.render('login.hbs');
})

// dashboard route will check if the user is logged in and server
// the dashboard page
app.get('/dashboard', (req, res) => {
	if (req.session.user) {
		//res.sendFile(__dirname + '/public/dashboard.html')
		// render the handlebars template with the email of the user
		res.render('dashboard.hbs', {
			email: req.session.email
		})
	} else {
		res.redirect('/login')
	}
})
/*********************************************************/

/*** API Routes below ************************************/

/** Student resource routes **/
// a POST route to *create* a student
app.post('/students', authenticate, (req, res) => {
	// log(req.body)

	// Create a new student using the Student mongoose model
	const student = new Student({
		name: req.body.name,
		year: req.body.year,
		creator: req.user._id // creator id from the authenticate middleware
	})

	// Save student to the database
	student.save().then((result) => {
		res.send(result)
	}, (error) => {
		res.status(400).send(error) // 400 for bad request
	})
})

/*************************************************/
// Express server listening...
const port = process.env.PORT || 5000
http.listen(port, () => {
	log(`Listening on port ${port}...`)
}) 

