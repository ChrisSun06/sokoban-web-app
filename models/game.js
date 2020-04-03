
const mongoose = require('mongoose')

const gameDataScheme = new mongoose.Schema({
	num_rows: {
		type: Number,
		required: true
	},
	num_cols: {
		type: Number,
		required: true
	},
	goals: [{
		row : {type: Number},
		col : {type: Number}
		}],
	boxes: [{
		row : {type: Number},
		col : {type: Number}
		}],
	walls: 
		[{
		row : {type: Number},
		col : {type: Number}
		}],
	players: [
		{
			row : {type: Number},
			col : {type: Number},
			player_num: {type: Number}
		}
	]
})

const gameSchema = new mongoose.Schema({
	game_name: {
		type: String,
		required: true,
	},
	image_id: {
        type: String,
        required: true
    },
	creater: {
		type: String,
		required: true
	},
	nickname: {
		type: String,
		required: true
	},
	preview_image: {
		type: String,
		required: true
	},
	game: gameDataScheme
})



const Game = mongoose.model('Game', gameSchema)


module.exports = { Game }