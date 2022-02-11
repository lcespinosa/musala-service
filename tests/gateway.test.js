const mongoose = require('mongoose')
const { setupDB } = require('./test-setup')
const request = require('supertest')
const Gateway = require('../models/gateway.schema');
const Device = require('../models/device.schema');

const app = require('../server')

describe("/api/gateways TEST", () => {
  setupDB();

  test('should get all gateways with device info', async () => {
    const device = await Device.create({
      uid: 451236,
      vendor: 'vmWare',
      created_at: new Date(),
      status: 'online',
    });
    const gateway = await Gateway.create({
      serial_number: 'some serial number',
      name: 'some readable name',
      ipv4: '123.123.123.123',
      devices: [device]
    });

    await request(app)
      .get('/api/gateways')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response.body.gateways)).toBeTruthy();
        expect(response.body.gateways.length).toEqual(1);

        // Check the response data
        expect(Array.isArray(response.body.gateways[0].devices)).toBeTruthy();
        expect(response.body.gateways[0].devices.length).toEqual(1);
        expect(response.body.gateways[0]._id).toBe(gateway.id);
        expect(response.body.gateways[0].serial_number).toBe(gateway.serial_number);
        expect(response.body.gateways[0].name).toBe(gateway.name);
        expect(response.body.gateways[0].ipv4).toBe(gateway.ipv4);
      });
  });

  it('should get a single gateway with device info', async () => {
    const device = await Device.create({
      uid: 451236,
      vendor: 'vmWare',
      created_at: new Date(),
      status: 'online',
    });
    const gateway = await Gateway.create({
      serial_number: 'some_serial_number',
      name: 'some readable name',
      ipv4: '123.123.123.123',
      devices: [device]
    });

    await request(app)
      .get(`/api/gateways/${gateway._id}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        const data = response.body.gateway;
        expect(typeof data === 'object' && data !== null).toBeTruthy();

        // Check the response data
        expect(Array.isArray(data?.devices)).toBeTruthy();
        expect(data?.devices.length).toEqual(1);
        expect(data?._id).toBe(gateway.id);
        expect(data?.serial_number).toBe(gateway.serial_number);
        expect(data?.name).toBe(gateway.name);
        expect(data?.ipv4).toBe(gateway.ipv4);
      });
  });

  it("should get NOT_FOUND with a gateway doesn't exist", async () => {
    await request(app)
      .get(`/api/gateways/6203774b7cc7d97beb58e451`)
      .expect(404);
  });

  it('should create gateway with valid data', async () => {
    const res = await request(app)
      .post('/api/gateways')
      .send({
        serial_number: '123123123',
        name: 'some_name',
        ipv4: '123.123.123.123',
        devices: [
          {
            uid: 551236,
            vendor: 'vmWare8',
            created_at: new Date(),
            status: 'online',
          }
        ]
      });

    const gateway = await Gateway.findOne({serial_number: '123123123'});
    const device = await Device.findOne({uid: 551236});
    expect(gateway).toBeTruthy();
    expect(device).toBeTruthy();
  });

  it('should not create gateway without valid data', async () => {
    const res = await request(app)
      .post('/api/gateways')
      .send({
        serial_number: '123123123',
        name: 'some_name',
        ipv4: '123.123.123',
      })
      .expect(400);
  });

  it('can add less than or equal to 10 devices in gateway', async () => {
    const devices = [];
    for (let i=0; i<9; i++) {
      const device = await Device.create({
        uid: 451236 + i,
        vendor: 'vmWare',
        created_at: new Date(),
        status: 'online',
      });
      devices.push(device);
    }
    const gateway = await Gateway.create({
      serial_number: 'some_serial_number',
      name: 'some readable name',
      ipv4: '123.123.123.123',
      devices
    });

    const res = await request(app)
      .patch(`/api/gateways/${gateway._id}/devices`)
      .send({
        uid: 551236,
        vendor: 'vmWare8',
        created_at: new Date(),
        status: 'online',
      })
      .expect(200);
  });

  it('should not add more than 10 devices in a gateway', async () => {
    const devices = [];
    for (let i=0; i<10; i++) {
      const device = await Device.create({
        uid: 451236 + i,
        vendor: 'vmWare',
        created_at: new Date(),
        status: 'online',
      });
      devices.push(device);
    }
    const gateway = await Gateway.create({
      serial_number: 'some_serial_number',
      name: 'some readable name',
      ipv4: '123.123.123.123',
      devices
    });

    const res = await request(app)
      .patch(`/api/gateways/${gateway._id}/devices`)
      .send({
        uid: 551236,
        vendor: 'vmWare8',
        created_at: new Date(),
        status: 'online',
      })
      .expect(400);
  });

  it('should remove device from a gateway', async () => {
    const device = await Device.create({
      uid: 451236,
      vendor: 'vmWare',
      created_at: new Date(),
      status: 'online',
    });
    const gateway = await Gateway.create({
      serial_number: 'some serial number',
      name: 'some readable name',
      ipv4: '123.123.123.123',
      devices: [device]
    });

    await request(app)
      .delete(`/api/gateways/${gateway._id}/devices/${device._id}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(true).toBe(true);
  });

  it('should get NOT_FOUND at remove nonexistent device from a gateway', async () => {
    const gateway = await Gateway.create({
      serial_number: 'some serial number',
      name: 'some readable name',
      ipv4: '123.123.123.123',
    });

    await request(app)
      .delete(`/api/gateways/${gateway._id}/devices/6203774b7cc7d97beb58e451`)
      .expect('Content-Type', /json/)
      .expect(404);
  });

})