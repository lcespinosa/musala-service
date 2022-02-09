const {Router} = require('express');
const {check} = require("express-validator");

const {getGateways, getOneGateway, storeGateway, addDevice, removeDevice} = require("../controllers/gateway.controller");
const {validateGatewayFields} = require("../middlewares/gateway_store.request");

const router = Router();

router.get('/', getGateways);
router.get('/:id', getOneGateway);

router.post('/', [
  check('serial_number').notEmpty({ignore_whitespace: true}),
  check('name').notEmpty(),
  check('ipv4').isIP(4),
  validateGatewayFields
], storeGateway);

router.patch('/:id/devices', [
  check('uid').notEmpty(),
  check('vendor').notEmpty(),
  check('created_at').notEmpty(),
  check('status').isIn(['online', 'offline']),
  validateGatewayFields
], addDevice);

router.delete('/:gatewayId/devices/:id', removeDevice);

module.exports = router;