var DB = require('./db');

var db = new DB({ db: 'music'}, function(err, db) {

  /*
  db.allArtists(function(err, artists) {
    console.log(artists);
  }); */

  // Try to update database information
  var documentId = "d366f804-8b29-40bb-b13c-ea76034c8f59";
  db.artists.get(documentId).update({ updated_at : new Date() }).run(db.conn, function( err, res) {
    console.log("Updated!");
  });
});
