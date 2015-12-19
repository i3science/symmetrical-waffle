'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * The Organizer represents an actor associated with a media organization who is
 * responsible for organizing campaigns.
 */
var Influencer = new Schema({
	amplifier: Boolean,
	name: {
		first: String,
		last: String
	},
	email: String,
	reach: [{
		medium: String,
		value: Number
	}],
	mediaKit: [{
		name: String,
		price: Number
	}],
	verticals: [String],
	audience: {
		sex: String,
		language: String,
		age: {
			start: Number,
			end: Number
		},
		married: Boolean,
		kids: [String],
		country: String,
		region: String,
		city: String,
		residence: String,
		householdIncome: Number,
		pets: [String],
		ethnicity: String
	},
	personal: {
		sex: String,
		language: String,
		age: {
			start: Number,
			end: Number
		},
		married: Boolean,
		kids: [Number],
		country: String,
		region: String,
		city: String,
		residence: String,
		householdIncome: Number,
		pets: [String],
		ethnicity: String
	}
});



mongoose.model('Influencer', Influencer);
module.exports = Influencer;