import { Hono } from 'hono';
import { sendOrderHandlers } from './sendOrder.handler';

const sendOrder = new Hono().post('/', ...sendOrderHandlers);

export default sendOrder;
