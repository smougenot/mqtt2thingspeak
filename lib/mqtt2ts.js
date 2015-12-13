/**
 * Created by smougenot on 12/12/15.
 */
'use strict';
const
  mqtt = require('mqtt'),
  url = require('url'),
  request = require('request'),
//  device = require(__dirname + '/device')(),
//  turn = require(__dirname + '/turn')(device),
  Debug = require('debug'),
  debug = new Debug('app'),
  err = new Debug('app:error'),
  // config
  mqtt_url = url.parse(process.env.MQTT_URL || 'mqtt://localhost:1883'),
  auth = (mqtt_url.auth || ':').split(':'),
  topic = '/esp/#',
  tsKey=process.env.TS_KEY || '',
  mappings= {
    'temperature': 'field1',
    'pressure': 'field2',
    'presure': 'field2'
  };

require('colors');

// Create a client connection
const client = mqtt.connect(mqtt_url, {
  username: auth[0],
  password: auth[1]
});

// store latests state
var datas ;

var copyDatas = function(srcObj, dstObj){
  Object.keys(srcObj).forEach(function(key) {
    dstObj[key] = srcObj[key];
  });
};

client.on('connect', function() { // When connected
  debug('Connected on mqtt %s for topic %s'.cyan, JSON.stringify(mqtt_url), topic);
  debug('TS key %s'.cyan, tsKey);
  datas={};

  // subscribe to a topic
  client.subscribe(topic, function() {
    // when a message arrives, do something with it
    client.on('message', function(topic, message, packet) {
      debug('Received "%s" : "%s"',
        topic, message
      );
      var param = {};
      param[mappings[topic.split('/').pop()]] = ''+message;
      copyDatas(param, datas);
      copyDatas(datas, param);
      param.api_key=tsKey;
      debug('Get params : "%s"',JSON.stringify(param));

      request({
        url: 'https://api.thingspeak.com/update', //URL to hit
        qs: param, //Query string data
        method: 'GET',
        //headers: {
        //  'Content-Type': 'MyContentType',
        //  'Custom-Header': 'Custom Value'
        //},
        //body: 'api_key='+tsKey+'\t'+mappings[topic.split('/').pop()]+'='+message //Set the body as a string
      }, function(error, response, body){
        if(error) {
          err(error);
        } else {
          debug('%s : %s', response.statusCode, body);
        }
      });
    });
  });
});

