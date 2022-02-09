const {Schema, model} = require("mongoose");
const Device = require('./device.schema');

const schema = Schema({
  serial_number: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  ipv4: { type: String, required: true },

  devices: [{ type: Schema.Types.ObjectId, ref: Device }]
});

module.exports = model("Gateway", schema);