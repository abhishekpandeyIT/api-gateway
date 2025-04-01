require('dotenv').config();
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/', (req, res) => res.send('API Gateway is running'));

// Product service proxy
app.use('/products', createProxyMiddleware({
  target: process.env.PRODUCT_SERVICE_URL || 'http://localhost:3001/products',
  changeOrigin: true,
  pathRewrite: { '^/products': '/products' } // Remove /products prefix when forwarding
}));

// Start server
app.listen(port, () => console.log(`Gateway running on port ${port}`));