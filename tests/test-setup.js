const mongoose = require("mongoose")

const databaseUrl = 'mongodb://127.0.0.1:27019/musala-test';

module.exports = {
  setupDB () {
    beforeEach((done) => {
      mongoose.connect(
        databaseUrl,
        {useNewUrlParser: true},
        () => done()
      )
    })

    afterEach((done) => {
      mongoose.connection.db.dropDatabase(() => {
        mongoose.connection.close(() => done())
      })
    });
  }
}