# mqtt2thingspeak
[![NPM version][npm-image]][npm-url] 
[![Build Status](https://travis-ci.org/smougenot/mqtt2thingspeak.svg?branch=master)](https://travis-ci.org/smougenot/mqtt2thingspeak)
[![Dependency Status][daviddm-image]][daviddm-url] 
[![Coverage percentage][coveralls-image]][coveralls-url]

> Transfers mqtt message to thingspeak channel


## Install

```sh
$ npm install --save mqtt2thingspeak
```


## Usage

```js
var mqtt2thingspeak = require('mqtt2thingspeak');
```

```bash
DEBUG=app node --harmony dist/mqtt2ts.js
```
Can be started as a deamon (using /etc/init.d) by linking the file script/mqtt2thingspeak to /etc/init.d
It might need some editing for setup

```bash
ln -s "$(pwd)/script/mqtt2thingspeak" /etc/init.d/
service mqtt2thingspeak start
```

## License

ISC © [Sylvain Mougenot]()


[npm-image]: https://badge.fury.io/js/mqtt2thingspeak.svg
[npm-url]: https://npmjs.org/package/mqtt2thingspeak
[travis-image]: https://travis-ci.org/smougenot/mqtt2thingspeak.svg?branch=master
[travis-url]: https://travis-ci.org/smougenot/mqtt2thingspeak
[daviddm-image]: https://david-dm.org/smougenot/mqtt2thingspeak.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/smougenot/mqtt2thingspeak
[coveralls-image]: https://coveralls.io/repos/smougenot/mqtt2thingspeak/badge.svg
[coveralls-url]:   https://coveralls.io/github/smougenot/mqtt2thingspeak
