import express from 'express';
import jwt from 'jsonwebtoken';
import router from './routes/auth.routes';

const app = express();
app.use(express.json())
app.use('/api/user',router)
app.set("port", process.env.PORT || 3000);

export default app;