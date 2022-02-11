const {Schema,model}  = require("mongoose");

/**
 * Device mongo schema
 *
 * */
const schema = Schema({
  uid: { type: Number, required: true, unique: true },
  created_at: { type: Date, required: true },
  vendor: { type: String, required: true },
  status: { type: String, enum: ['online', 'offline'], default: 'offline', required: true },
});

module.exports = model("Device", schema);