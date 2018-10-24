# HTTP JSON API Recorder
*Record API responses and replay them offline. Useful for UI testing setups.*

Runs a proxy server that acts in two modes:
- recording mode: stores every responses of target API to specified directory.
- replay mode: respond to API requests using previously recorded responses.

## Installation

```sh
$ npm install api-recorder -g
```

## Configuration

```json
{
  "port": 3000,
  "directory": "~/offline_data",
  "target": "http://my.api.local:8080",
  "fingerprint": [
    "method",
    "url",
    "query",
    "body",
    {
      "headers": [
        "user-agent",
        "accept-language",
        "host"
      ]
    }
  ]
}
```

### `port` *Integer*
Port used by the proxy.

### `directory` *String*
Directory to write to / read from API responses.

### `target` *String*
Real server hosting the API to record.

### `fingerprint` *Array*
List of keys from the `request` object to use to "fingerprint" the request. Can be specifed as an object when reading request object properties (for example `headers`).

## Usage

### CLI

#### Record API responses
```sh
$ api-recorder -c=/path/to/config.json
```

#### Replay API responses (offline mode)
```sh
$ api-recorder -c=/path/to/config.json --offline
```

#### Replay API responses that are already recorded, record others
```sh
$ api-recorder -c=/path/to/config.json --offline --autofix
```

### Node API

```javascript
const apiRecorder = require('api-recorder');

// Initialize and start HTTP service
const service = apiRecorder({
  config: '/path/to/config.json',
  directory: '/path/to/directory',
  offline: false // or true
});

// Some code that pulls data from the service

service.close(); // Close HTTP service
```

## TODO

- [x] allow request fingerprinting customization
- [ ] allow responses delaying by configuration
- [ ] tests
- [ ] support non-JSON APIs
