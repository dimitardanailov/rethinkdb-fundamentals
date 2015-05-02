RethinkDB Example Project

Course: [RethinkDB Fundamentals](http://www.pluralsight.com/courses/rethinkdb-fundamentals)

## Install database library

```bash
npm install rethinkdb --save
```

## Install async library

```bash
npm install async --save
```

## Sharding and Replication

Create a new sharding server

```bash
rethinkdb -n Harry --port-offset 1 --join localhost:29015 -t asia --cluster-port 29017 --driver-port 28017 --http-port 8082
```

## Mac os x elasticsearch installation

Source: [Elastic search installation](http://stackoverflow.com/questions/22850247/installing-elasticsearch-on-osx-mavericks/22855889#22855889)

You should really consider using [brew](http://brew.sh/). It's a great tool that will take care of dependencies, version control and much more.

To install elasticsearch using brew, simlpy:

```bash
brew update
brew install elasticsearch
```

Boom! done

After that follow elasticsearch instructions :

1.

> To have launchd start elasticsearch at login:

```bash
ln -sfv /usr/local/opt/elasticsearch/*.plist ~/Library/LaunchAgents
```

2.

> Then to load elasticsearch now:

```bash
launchctl load ~/Library/LaunchAgents/homebrew.mxcl.elasticsearch.plist
```

> Or, if you don't want/need launchctl, you can just run:

```elasticsearch --config=/usr/local/opt/elasticsearch/config/elasticsearch.yml```

## Rethinkdb: Full-text search with Elasticsearch

Source: (Full-text search with Elasticsearch)[http://rethinkdb.com/docs/elasticsearch/]

To configure our river, we need to create a type called `rethinkdb` in the `_river` index. Then we need to insert a document with the id `_meta` into that type. Elasticsearch lets us create the document and the type in one go with a `PUT` request:

```bash
curl -XPUT localhost:9200/_river/rethinkdb/_meta -d '
{
  "type": "rethinkdb",
  "rethinkdb": {
    "host": "localhost",
    "port": 28015,
    "databases": {
      "blog": {
        "posts": { "backfill": true },
        "comments": { "backfill": true }
      }
    }
  }
}'
```

### elasticsearch.js

Repo: (The official low-level Elasticsearch client for Node.js and the browser.)[https://github.com/elastic/elasticsearch-js]

Installation:

```bash
npm install elasticsearch
```

Create a client instance

```bash
var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});
```

Find `tweets` that have "elasticsearch" in their body field

```bash
client.search({
  index: 'twitter',
  type: 'tweets',
  body: {
    query: {
      match: {
        body: 'elasticsearch'
      }
    }
  }
}).then(function (resp) {
    var hits = resp.hits.hits;
}, function (err) {
    console.trace(err.message);
});
```
