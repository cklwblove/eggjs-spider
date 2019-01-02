'use strict';

module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const BaseModel = require('../schemaPlugin');

  const ChapterSchema = new Schema({
    title: {
      type: String,
      trim: true
    },
    chapterId: {
      unique: true,
      type: Number,
      trim: true
    },
    bookId: {
      type: Number,
      ref: 'Book'
    },
    content: {
      type: String,
      trim: true
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

  ChapterSchema.plugin(BaseModel);

  return mongoose.model('Chapter', ChapterSchema);
}
