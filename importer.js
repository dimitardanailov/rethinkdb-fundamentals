var r = require("rethinkdb");

r.connect({db: "music"}, function(err, conn) {

  var artists = require("./data/artists.json");
  var counter = 1;

  // What is durability ?
  // { durability: soft } // Acknowledge the write, but don't wait wait for disk persistance
  // { durability: hard } // The default, only acknowledge the write after persistance.
  
  // Get information from json and insert every object in database
  console.log("Insert records via foor loop");
  artists.forEach(function(artist) {
    r.table("artists").insert(artist).run(conn, { durability: "soft", noreply: true},  function(err, res) {
      console.log(counter);
      counter++;
    });
  });

  // Insert all records with only one query
  console.log("Insert all records with only one query");
  r.table("artists").insert(artists).run(conn, { durability: "soft", noreply: true},  function(err, res) {
    console.log(artists.length);
    counter++;
  });

  conn.close();
});
