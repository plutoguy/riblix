const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

const nggUrl = 'https://now.gg/apps/electronic-arts/1353/ea-sports-fc-mobile-24-soccer.html';

const proxy = createProxyMiddleware({
  target: nggUrl,
  changeOrigin: true,
  secure: true,
  logLevel: 'debug',
  router: function(req) {
    if (req.headers.host === 'now.gg/') {
      req.headers['X-Forwarded-For'] = ''; 
      req.headers['X-Real-IP'] = '';
      req.headers['Via'] = '';
    }
    return nggUrl;
  }
});

app.use('/', proxy);

const port = process.env.PORT || 443;
app.listen(port, () => {
  console.log(`Charm is running on port ${port}`);
});
