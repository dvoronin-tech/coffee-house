import { Hono } from 'hono';
import sendOrder from './send-order/send-order.route';

const routes = new Hono().route('/send-order', sendOrder);

export default routes;
export type AppType = typeof routes;
