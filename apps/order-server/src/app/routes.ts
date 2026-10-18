import { Hono } from 'hono';
import sendOrder from './sendOrder/sendOrder.route';

const routes = new Hono().route('/api/send-order', sendOrder);

export default routes;
export type AppType = typeof routes;
