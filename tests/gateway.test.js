const mongoose = require('mongoose')
const databaseUrl = 'mongodb://127.0.0.1:27019/musala-test'

describe("Gateway feature test", () => {

  beforeAll(async () => {
    const url = `${databaseUrl}`
    await mongoose.connect(url, { useNewUrlParser: true })
  });

  it('should get all gateways with device info', () => {
    expect(true).toBe(true);
  });

  it('should get a single gateway with device info', () => {
    expect(true).toBe(true);
  });

  it('should create gateway with valid data', () => {
    expect(true).toBe(true);
  });

  it('should not create gateway without valid data', () => {
    expect(true).toBe(true);
  });

  it('should create device with valid data', () => {
    expect(true).toBe(true);
  });

  it('should remove device from a gateway', () => {
    expect(true).toBe(true);
  });

})