const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')


const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		minlength: 1,
		trim: true,
		unique: true,
		validate: {
			validator: validator.isEmail,   // custom validator
			message: 'Not valid email'
		}
	}, 
	password: {
		type: String,
		required: true,
		minlength: 4
	},
	tokens: {
		type: Number,
		required: true
	},
	isAdmin: {
		type: Boolean,
		required: true
	},
	nickname: {
		type: String,
		minlength: 1,
		trim: true,
		required: true
	},
	avatar: {
		type: String,
		required: true
	}
})


UserSchema.pre('save', function(next) {
	const user = this; // binds this to User document instance

	// checks to ensure we don't hash password more than once
	if (user.isModified('password')) {
		// generate salt and hash the password
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, (err, hash) => {
				user.password = hash
				next()
			})
		})
	} else {
		next()
	}
})


// A static method on the document model.
// Allows us to find a User document by comparing the hashed password
//  to a given one, for example when logging in.
UserSchema.statics.findByEmailPassword = function(email, password) {
	const User = this // binds this to the User model
	// First find the user by their email
	return User.findOne({ email: email }).then((user) => {
		if (!user) {
			console.log("user param not exist")
			return Promise.reject()  // a rejected promise
		}
		// if the user exists, make sure their password is correct
		return new Promise((resolve, reject) => {
			bcrypt.compare(password, user.password, (err, result) => {
				if (result) {
					resolve(user)
				} else {
					reject()
				}
			})
		})
	})
}

UserSchema.statics.findById = function(id) {
	const User = this // binds this to the User model
	// First find the user by their email
	return User.findOne({ _id: id }).then((user) => {
		if (!user) {
			console.log("user param not exist")
			return Promise.reject()  // a rejected promise
		}
		// if the user exists, make sure their password is correct
		return new Promise((resolve, reject) => {
			resolve(user)
		})
	})
}

// make a model using the User schema
const User = mongoose.model('User', UserSchema)


module.exports = { User }
