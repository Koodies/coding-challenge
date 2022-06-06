const MongoClient = require("mongodb").MongoClient;
let clients = {}

class MongoConnect {
  static connectDB(mongoURL, done) {
    MongoClient.connect(
      mongoURL,
      (err, client) => {
        if (err) {
          return done(err);
        }
        clients["test"] = client;
        done();
      }
    );
  }

  static getDB() {
    if(!clients["test"]) return null
    return clients["test"].db();
  }
}

module.exports = MongoConnect;
