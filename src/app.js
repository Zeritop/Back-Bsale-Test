import express from 'express';
import cors from 'cors';
import products from './routes/products.js';

const app = express();

// Settings
app.set('port', process.env.PORT || 4000);

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', products)

export default app