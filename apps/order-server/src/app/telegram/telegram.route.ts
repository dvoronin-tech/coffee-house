import { Hono } from 'hono';
import { telegramHandlers } from './telegram.handler';

const telegram = new Hono().post('/', ...telegramHandlers);

export default telegram;
