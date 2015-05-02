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
