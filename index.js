var r = require("rethinkdb");
var async = require("async");

var createDb = function(next) {
  // Connect to rethinkdb server
  r.connect(function(err, conn) {

    // Connect to database
    r.dbCreate("music").run(conn, function(err, res) {
      conn.close();
      next(err, res);
    });
  });
};

// Create rethinkdb table
// @param name is table name
var createTable = function(name, next) {
  r.connect({db: "music"}, function(err, conn) {
    r.tableCreate(name).run(conn, function(err, res) {
      conn.close();
      next(err, res);
    });
  });
};

var createTables = function(next) {
  async.map(["artists", "invoices"], createTable, next);
};

async.series({
  created: createDb,
  tables: createTables
}, function(err, res) {
  console.log(res);
});
