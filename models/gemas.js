'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema

const GemaSchema = Schema({
	
	name: String,
	price:{ type: Number, default: 0} ,
	description: String,
	images: String,
	stock:{ type: Number } ,
	
	discounts:{ type:Number,
		enum: [10,15,25,35] },

		stars:{ type: Number,
			arre: [1,2,3,4,5] },
			comments: String,
			author:String,

		}) 

module.exports = mongoose.model('Gema', GemaSchema)