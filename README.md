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

Source: [Elastic search installation](http://www.pluralsight.com/courses/rethinkdb-fundamentals)

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

```ln -sfv /usr/local/opt/elasticsearch/*.plist ~/Library/LaunchAgents```

2.

> Then to load elasticsearch now:

```launchctl load ~/Library/LaunchAgents/homebrew.mxcl.elasticsearch.plist```

> Or, if you don't want/need launchctl, you can just run:

```elasticsearch --config=/usr/local/opt/elasticsearch/config/elasticsearch.yml```
