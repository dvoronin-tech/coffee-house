import { Hono } from 'hono';
import { sendOrderHandlers } from './send-order.handler';

const sendOrder = new Hono().post('/', ...sendOrderHandlers);

export default sendOrder;
