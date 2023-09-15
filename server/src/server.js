import { config } from 'dotenv';
import process from 'node:process';
import * as url from 'node:url';
import express from 'express';
import morgan from 'morgan';
// import api from './api';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
if (process.env.NODE_ENV === 'development') {
  config({ path: `.env.${process.env.NODE_ENV}.local` });
} else {
  config();
}

const app = express();
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: `${__dirname}/public/` });
});

// app.use('/api', api);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
