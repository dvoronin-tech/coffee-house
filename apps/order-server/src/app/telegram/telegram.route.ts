import { Hono } from 'hono';
import { telegramHandlers } from './telegram.handler.js';

const telegram = new Hono().post('/', ...telegramHandlers);

export default telegram;
