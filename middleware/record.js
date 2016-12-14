'use strict';

const {createProxyServer} = require('http-proxy'),
      {resolveRequestPath} = require('../lib/resolve'),
      write = require('../lib/write');

module.exports = ({target, directory}) => {
  const proxy = createProxyServer({target});

  proxy.on('proxyRes', (proxyRes, req) => {
    let response = '';
    proxyRes
      .on('data', chunk => response += chunk)
      .on('end', () => {
        const filename = resolveRequestPath(req, directory),
              {headers} = proxyRes;
        write(filename, headers, response);
      });
  });

  return proxy.web.bind(proxy);
};
