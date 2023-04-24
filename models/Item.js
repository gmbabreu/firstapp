
'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var ItemSchema = Schema( {
  amount:Number,
  category:String,
  date:String,
  description:String,
  userId:ObjectId
} );

module.exports = mongoose.model( 'Item', ItemSchema );
