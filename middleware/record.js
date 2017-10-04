'use strict';

const {createProxyServer} = require('http-proxy'),
      {resolveRequestPath} = require('../lib/resolve'),
      write = require('../lib/write');

module.exports = ({target, directory, restream}) => {
  const proxy = createProxyServer({target, secure: false});

  // https://github.com/nodejitsu/node-http-proxy/issues/180
  // https://github.com/nodejitsu/node-http-proxy/blob/d0e000e1f91a969f1711eb3be7d1acb16c4538df/examples/middleware/bodyDecoder-middleware.js#L37-L47
  if (restream) {
    proxy.on('proxyReq', (proxyReq, req) => {
      if (req.body) {
        const body = JSON.stringify(req.body);
        proxyReq.setHeader('Content-Type','application/json');
        proxyReq.setHeader('Content-Length', Buffer.byteLength(body));
        proxyReq.write(body);
      }
    });
  }

  proxy.on('proxyRes', (proxyRes, req) => {
    let response = '';
    proxyRes
      .on('data', chunk => response += chunk)
      .on('end', () => {
        const filename = resolveRequestPath(req, directory),
              {headers} = proxyRes,
              status = {status: proxyRes.statusCode};
        write(filename, status, headers, response);
      });
  });

  return proxy.web.bind(proxy);
};
