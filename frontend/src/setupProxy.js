const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use('/api', createProxyMiddleware({
      target: 'https://cruzcarsapi.cyclic.app',
      changeOrigin: true,
    })
  );
};
/* 
  * I configured my local development proxy with the help of the http-proxy-middleware.
*/

/* 
  REFERENCES
  ==========>
* Learnt how to configure the Proxy Manually at https://create-react-app.dev/docs/proxying-api-requests-in-development/#configuring-the-proxy-manually
 */