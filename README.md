# HTTP JSON API Recorder
*Record API responses and replay them offline.*

Runs a proxy server that acts in two modes:
- recording mode: stores every responses of target API to specified directory.
- replay mode: respond to API requests using previously recorded responses.

## Installation

```sh
$ npm install api-recorder -g
```

## Usage

```sh
$ api-recorder -p=3000 -d=~/Desktop/my_api -t=http://my.api:1234
```

You can then configure your application to point to the proxy.

**Arguments**
- **`-p`, `--port`:** Port the proxy will use.
- **`-d`, `--directory`:** Directory where recorded responses should be written / read.
- **`-t`, `--target`:** Optional. When defined, the proxy reaches out to the real API and records it to specified `directory`. When not defined, the proxy simply returns the responses from the specified `directory`.

## TODO

- tests
- support non-JSON APIs
- allow request fingerprinting customization
- allow responses delaying by configuration
