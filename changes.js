var r = require("rethinkdb");

r.connect({db: "music"}, function(err, conn) {

  // we watching for table changes
  r.table("monkeys").changes().run(conn, function(err, cursor) {
    cursor.each(console.log);
  });
});
