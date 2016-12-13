'use strict';

const {createProxyServer} = require('http-proxy'),
      resolve = require('../lib/resolve'),
      write = require('../lib/write');

module.exports = ({target, dir}) => {
  const proxy = createProxyServer({target});
  proxy.on('proxyRes', (proxyRes, req) => {
    let response = '';
    proxyRes
      .on('data', chunk => response += chunk)
      .on('end', () => {
        const filename = resolve(req, dir),
              {headers} = proxyRes;
        write(filename, headers, response);
      });
  });

  return proxy.web.bind(proxy);
};
