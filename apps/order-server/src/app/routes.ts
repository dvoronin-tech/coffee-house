import { Hono } from 'hono';
import sendOrder from './sendOrder/sendOrder.route';
import telegram from './telegram/telegram.route';

const routes = new Hono()
    .route('/api/send-order', sendOrder)
    .route('/telegram', telegram);

export default routes;
export type AppType = typeof routes;
