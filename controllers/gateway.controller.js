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
    });

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
  const {serial_number, name, ipv4} = req.body;

  try {
    const existGateway = await Gateway.findOne({serial_number});
    if (existGateway) {
      return res.status(400).json({
        ok: false,
        errors: 'The gateway already exist'
      });
    }

    const gateway = new Gateway(req.body);
    await gateway.save();

    res.json({
      ok: true,
      gateway
    });
  }
  catch (e) {
    res.status(500).json({
      ok: false,
      message: 'Error!'
    });
  }
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

      const updatedGateway = await Gateway.findByIdAndUpdate(id, {
        $push: {
          devices: [new Device({uid, created_at, vendor, status})]
        }
      }, { upsert: true });

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