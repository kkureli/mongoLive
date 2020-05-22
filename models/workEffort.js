const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  comment: [{ type: mongoose.Types.ObjectId, ref: "Comment" }],
});

const WorkEffort = mongoose.model("WorkEffort", schema);
module.exports = WorkEffort;
