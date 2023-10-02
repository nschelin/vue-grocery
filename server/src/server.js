import './config/index.js';
import express from 'express';
import morgan from 'morgan';
import { api } from './api/index.js';
import { db } from './db/index.js';
import * as url from 'node:url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const app = express();
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
	res.sendFile('index.html', { root: `${__dirname}/public/` });
});

await db.sync();
await db.authenticate();
app.use('/api', api);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server started on port: ${PORT}`);
});
