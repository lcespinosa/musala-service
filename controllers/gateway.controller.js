const Gateway = require('../models/gateway.schema');
const Device = require('../models/device.schema');
const mongoose = require('mongoose');

const getGateways = async (req, res) => {
  try {
    const gateways = await Gateway.find().populate({path: 'devices'}).sort('-online');
    res.json({
      ok: true,
      gateways,
    });
  }
  catch (e) {
    res.status(500).json({
      ok: false,
      message: 'Error!'
    });
  }
}

const getOneGateway = async (req, res) => {
  const id = req.params.id;

  try {
    const gateway = await Gateway.findOne({
      _id: id
    }).populate({path: 'devices'});

    if (!gateway) {
      res.status(404).json({
        ok: false,
        errors: 'Gateway not found!',
      });
    } else {
      res.json({
        ok: true,
        gateway
      });
    }
  }
  catch (e) {
    res.status(500).json({
      ok: false,
      message: 'Error!'
    });
  }
}

const storeGateway = async (req, res) => {
  const {serial_number, name, ipv4, devices} = req.body;

  try {
    const existGateway = await Gateway.findOne({serial_number});
    if (existGateway) {
      return res.status(400).json({
        ok: false,
        errors: 'The gateway already exist'
      });
    }

    if (devices.length <= 10) {
      const gateway = new Gateway({serial_number, name, ipv4});
      await gateway.save();

      for (let device of devices) {
        await storeDevice(gateway._id, device);
      }
      const updatedGateway = await Gateway.findById(gateway.id).populate({path: 'devices'});
      const data = updatedGateway.toObject();

      res.json({
        ok: true,
        gateway
      });
    }
    else {
      return res.status(400).json({
        ok: false,
        message: 'The gateway should not have more than 10 devices.'
      });
    }
  }
  catch (e) {
    res.status(400).json({
      ok: false,
      message: 'Error!'
    });
  }
}

const storeDevice = async (gatewayId, data) => {
  return Gateway.findByIdAndUpdate(gatewayId, {
    $push: {
      devices: [await Device.create(data)]
    }
  }, { upsert: true });
}

const addDevice = async (req, res) => {
  const id = req.params.id;
  const {uid, created_at, vendor, status} = req.body;

  try {
    const gateway = await Gateway.findOne({_id: id}).populate({path: 'devices'});
    const data = gateway.toObject();
    if (data) {
      if (data.devices.length >= 10) {
        return res.status(400).json({
          ok: false,
          message: 'The gateway should not have more than 10 devices.'
        });
      }

      const updatedGateway = await storeDevice(id, {uid, created_at, vendor, status});

      res.json({
        ok: true,
        gateway: updatedGateway
      });
    }
  }
  catch (e) {
    res.status(500).json({
      ok: false,
      message: 'Error!'
    });
  }
}

const removeDevice = async (req, res) => {
  const gatewayId = req.params.gatewayId;
  const id = req.params.id;

  try {
    const gateway = await Gateway
      .findOne({_id: gatewayId})
      .populate({path: 'devices', match: {_id: new mongoose.Types.ObjectId(id)}});
    const data = gateway.toObject();

    if (data && data?.devices.length > 0) {
      await Device.deleteOne({_id: id});
      return res.json({
        ok: true,
        message: 'Successfully operation',
      });
    }
    else {
      return res.status(404).json({
        ok: false,
        message: 'Device not found'
      });
    }
  }
  catch (e) {
    res.status(500).json({
      ok: false,
      message: 'Error!'
    });
  }
}

module.exports = {
  getGateways,
  getOneGateway,
  storeGateway,
  addDevice,
  removeDevice,
}