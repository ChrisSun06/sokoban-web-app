/* server.js - user & resource authentication */
"use strict"
const log = console.log
var path = require('path');
const express = require('express')
const app = express()
    , server = require('http').createServer(app)
    , io = require('socket.io').listen(server);

const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');
const { mongoose } = require('./db/mongoose')
mongoose.set('useFindAndModify', false); // for some deprecation issues
const { ObjectID } = require('mongodb')
const { User } = require('./models/user')
const bcrypt = require('bcryptjs')
const { Game } = require('./models/game')
const bodyParser = require('body-parser') 
app.use(bodyParser.json())
app.use(cookieParser())
const session = require('express-session')
app.use(bodyParser.urlencoded({ extended: true }));

// multipart middleware: allows you to access uploaded file from req.file
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

// cloudinary: configure using credentials found on your Cloudinary Dashboard
// sign up for a free account here: https://cloudinary.com/users/register/free
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'sunhongyi24',
    api_key: '763116971925145',
    api_secret: 'zklCi1VFZ_sNkyP7aRpdYdNWlh8'
});

// starting the express server

let rooms = 0;

let players = {}
let rooms_info = {}

function localHash(pswd) {
	return new Promise((resolve, reject) => {
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(pswd.toString(), salt, (err, hash) => {
				resolve(hash)
			})
		})
	})
}

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

// A route to check if a use is logged in on the session cookie
app.get("/users/check-session", (req, res) => {
    if (req.cookies["id"]) {
        res.send(req.cookies["id"]);
    } else {
        res.status(401).send();
    }
});

app.post('/users/login', (req, res) => {
	const email = req.body.email
    const password = req.body.password
    // Use the static method on the User model to find a user
	// by their email and password
	console.log(req.body.remember_me)
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
			res.cookie('id',user._id, { httpOnly: true });
			if (req.body.remember_me){
				res.cookie('password', req.body.password, { httpOnly: true });
				res.cookie('remember', true,  { httpOnly: true })
			} else {
				res.cookie('remember', false,  { httpOnly: true })
			}
			res.cookie('email', user.email, { httpOnly: true });
			res.send(true)
        }
    }).catch((error) => {
		console.log(error)
		console.log("asd")
        res.status(400).send(error)
    })
})

app.post('/users/postGame', (req, res) => {
	const game_id = req.body.game_id
	res.cookie('game_id',game_id, { httpOnly: true });
	res.status(200).send()
})

app.get('/users/getGame', (req, res) => {
	const game_id = req.cookies["game_id"]
	Game.find({_id: game_id}).then((games) => {
		res.send(games[0])
	}, (error) => {
		res.status(400).send(error)
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
			res.send(user.nickname)
        }
    }).catch((error) => {
		console.log(error)
        res.status(400).send(error)
    })
})

app.get('/users/getInfoE', (req, res) => {
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
        res.status(400).send(error)
    })
})

app.get('/users/getInfoEmail', (req, res) => {
	// Based on this cookie's id, we set up information for the user.
	if (req.cookies["remember"]){
		console.log(req.cookies["remember"])
		if (req.cookies["remember"] === "true"){
			res.send({email: req.cookies["email"], password: req.cookies["password"]});
		} else if (req.cookies["remember"] === "false"){
			res.send({email: '', password: ''});
		}
	}
})

app.get('/getInfo', (req, res) => {
	const id = req.cookies["id"]
	// Based on this cookie's id, we set up information for the user.
	User.findById(id).then((user) => {
	    if (!user) {
            //res.redirect('/login');
            res.send(false)
        } else {
			res.send(user)
        }
    }).catch((error) => {
		console.log(error)
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
			let k = players[user.nickname]
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
		password: req.body.password,
		tokens: 1000,
		isAdmin: false,
		nickname: req.body.nickname,
		avatar: req.body.avatar
	})
	// Save the user
	user.save().then((result) => {
		if (!result){
			res.status(404).send()
		} else {
			res.send(result)
		}
	}, (error) => {
        console.log(error)
		res.status(400).send(error) // 400 for bad request
	})
})

app.get('/users', (req, res) => {
	User.find({}, function(err, docs){
		if (!err){ 
			res.send({docs})
		} else {
			res.status(400).send(err)
			throw err;}
	})
})

app.patch('/users', (req, res) => {
	const uid = req.body.id;
	const option = req.body.opt;
	if (option === "token"){
		User.findOneAndUpdate({"_id": uid},
		{
			tokens: req.body.tokens
		},{new: true}).then((result) => {
			if(!result){
				res.status(404).send()
			} else {
				console.log("success")
				console.log(result)
				res.send(result)
				return;
			}
		}).catch((error) => console.log(error))
	} else if (option === "password"){
		let pswd = req.body.password
		localHash(pswd).then(hashed => {
			User.findOneAndUpdate({"_id": uid},
			{
				password: hashed
			},{new: true}).then((result) => {
				if(!result){
					res.status(404).send()
				} else {
					console.log("success")
					console.log(result)
					res.send(result)
					return;
				}
			})
		}).catch(err => console.log(err))
	}
})

app.post('/users/newGame', (req, res) => {
	const game = new Game({
		game_name: req.body.game_name,
		creater: req.body.creater,
		nickname: req.body.nickname,
        preview_image: req.body.image_url,
        image_id: req.body.image_id,
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


	game.game = gamedata

	// Save the user
	game.save().then((rest) => {
		if (!rest){
			res.status(500).send()
		} else {
			res.send(rest)
		}
	}, (error) => {
		console.log(error)
		res.status(400).send(error) // 400 for bad request
	})
})

app.patch('/users/editGame', (req, res) => {
	const g_id = req.cookies["game_id"]
	const gamedata = {
		num_rows: req.body.num_rows,
		num_cols: req.body.num_cols,
		goals: req.body.goals,
		boxes: req.body.boxes,
		walls: 
			req.body.walls,
		players: req.body.players
	}


	if (!ObjectID.isValid(g_id)){
		res.status(404).send()
		return;
	}

	console.log(req.body.game_name)

	Game.findOneAndUpdate({"_id": g_id},
	{
		game_name: req.body.game_name,
		preview_image: req.body.image_url,
		image_id: req.body.image_id,
		game: gamedata
	},{new: true}).then((result) => {
		if(!result){
			res.status(404).send()
		} else {
			console.log("success")
			console.log(result)
			res.send(result)
			return;
		}
	}).catch((error) => console.log(error))
})

app.delete('/users/deleteGame', (req, res) => {
	// Add code here
	const g_id = req.body.gid
	// Validate id
	if (!ObjectID.isValid(g_id)) {
		res.status(404).send()
		return;
	}

	// Delete a student by their id
	Game.findOneAndRemove({_id: g_id}).then((game) => {
		if (!game) {
			res.status(404).send()
			return;
		} else {
			res.status(200).send()
			return;
		}
	}).catch((error) => {
		res.status(500).send(error) // server error, could not delete.
	})
})

app.get("/logoff", (req, res) => {
	res.cookie("id", '', {expires: new Date(0)});
	res.status(200).send()
})

app.get('/games', (req, res) => {
	// Add code here
	Game.find({creater: req.cookies["email"]}).then((games) => {
		//console.log(games)
		res.send(games)
	}, (error) => {
		res.status(400).send(error)
	})
})

app.get('/allGames', (req, res) => {
	// Add code here
	Game.find({}).then((games) => {
		//console.log(games)
		res.send(games)
	}, (error) => {
		res.status(400).send(error)
	})
})

app.post("/images", multipartMiddleware, (req, res) => {
    // Use uploader.upload API to upload image to cloudinary server.
    cloudinary.uploader.upload(
        req.files.image.path, // req.files contains uploaded files
        function (result) {
            // Create a new image using the Image mongoose model
            let img = {
                image_id: result.public_id, // image id on cloudinary server
                image_url: result.url, // image url on cloudinary server
            }
            res.send(img)
        });
});

/* The Socket I/O calls below *******************************/
io.on('connection', function (socket) {
	socket.on('createGame', function(data){
		rooms++;
		rooms_info[rooms] = {"player1": data.name, owner: data.name}
		socket.emit('newGame', {name: data.name, room: rooms, isowner: true});
		players[data.name] = {name: data.name, room: rooms, isowner: true}
		
	});
	socket.on('joinGame', function(data){
		let roomInt = parseInt(data.room)
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



app.use(express.static(__dirname + "/client/build"));

// All routes other than above will go to index.html
app.get("*", (req, res) => {
    res.sendFile(__dirname + "/client/build/index.html");
});

/*************************************************/
// Express server listening...
const port = process.env.PORT || 5000
server.listen(port, () => {
	log(`Listening on port ${port}...`)
}) 

