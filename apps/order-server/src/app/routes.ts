import { Hono } from 'hono';
import sendOrder from './sendOrder/sendOrder.route.js';
import telegram from './telegram/telegram.route.js';

const routes = new Hono()
    .route('/api/send-order', sendOrder)
    .route('/telegram', telegram);

export default routes;
export type AppType = typeof routes;
