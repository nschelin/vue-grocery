import process from 'node:process';
import { config } from 'dotenv';

if (process.env.NODE_ENV === 'development') {
	config({ path: `.env.${process.env.NODE_ENV}.local` });
} else {
	config();
}
