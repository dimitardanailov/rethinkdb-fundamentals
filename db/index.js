var rethinkdb = require('rethinkdb');
var assert = require('assert');
var elasticsearch = require('elasticsearch');

var DB = function(args, next) {
  var conn, es;

  es = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
  });

  assert(args.db, "Where 's the database ?")
  args.host || (args.host = 'localhost');

  var db = {
      // Get all artists in our database
      allArtists: function(next) {
         rethinkdb.table("artists").run(db.conn, function(err, result) {
           result.toArray(next);
         });
      },
      artists: rethinkdb.table("artists")
  };

  var syncSearch = function() {
    db.artists.changes().run(db.conn, function(err, changes) {
      changes.each(function(err, change) {
        var record = change.new_val;

        console.log(record);

        es.index({
          index : "music",
          type : "artist",
          id : record.id,
          body: {
            id: record.id,
            name: record.name,
            artist_id: record.artist_id
          }
        }, function(err, response) {
          console.log(response);
        });
      });
    });
  };

  rethinkdb.connect({ db: args.db, host: args.host }, function(err, conn) {
    db.conn = conn;
    syncSearch();
    next(err, db);
  });
}

module.exports = DB;
