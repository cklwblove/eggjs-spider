'use strict';

module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const BaseModel = require('../schemaPlugin');

  const BookSchema = new Schema({
    name: {
      type: String
    },
    bookId: {
      unique: true,
      type: Number
    },
    author: {
      type: String
    },
    headImg: {
      type: String
    },
    chapterNum: {
      type: Number
    },
    createAt: {
      type: Date,
      default: Date.now
    },
    updateAt: {
      type: Date,
      default: Date.now
    },
  });

  BookSchema.plugin(BaseModel);
  
  return mongoose.model('Book', BookSchema);
}
