/**
 * Created by smougenot on 12/12/15.
 */
'use strict';
const
  mqtt = require('mqtt'),
  url = require('url'),
//  device = require(__dirname + '/device')(),
//  turn = require(__dirname + '/turn')(device),
  Debug = require('debug'),
  debug = new Debug('app'),
  err = new Debug('app:error'),
  // config
  mqtt_url = url.parse(process.env.CLOUDMQTT_URL || 'mqtt://localhost:1883'),
  auth = (mqtt_url.auth || ':').split(':'),
  topic = '/esp/#'
  ;

// Create a client connection
const client = mqtt.createClient(mqtt_url.port, mqtt_url.hostname, {
  username: auth[0],
  password: auth[1]
});
debug('Listening on port mqtt %s for topic %s'.cyan, mqtt_url, topic);

client.on('connect', function() { // When connected

  // subscribe to a topic
  client.subscribe($topic, function() {
    // when a message arrives, do something with it
    client.on('message', function(topic, message, packet) {
      debug("Received '%s' : '%s'",
        topic, message
      );
    });
  });

  // publish a message to a topic
  client.publish('hello/world', 'my message', function() {
    console.log("Message is published");
    client.end(); // Close the connection when published
  });
});

