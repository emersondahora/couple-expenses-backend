import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';

import SessionControler from './app/controller/SessionController';
import UserControler from './app/controller/UserController';
import CategoryControler from './app/controller/CategoryController';
import PaymentFormControler from './app/controller/PaymentFormController';
import ExpenseControler from './app/controller/ExpenseController';

const routes = new Router();

/** Public routes */
routes.post('/session', SessionControler.store);

routes.use(authMiddleware);

routes.get('/users', UserControler.index);

routes.get('/categories', CategoryControler.index);
routes.post('/categories', CategoryControler.store);
routes.put('/categories/:id', CategoryControler.update);
routes.get('/categories/:id', CategoryControler.show);
routes.delete('/categories/:id', CategoryControler.delete);

routes.get('/payment-forms', PaymentFormControler.index);
routes.post('/payment-forms', PaymentFormControler.store);
routes.put('/payment-forms/:id', PaymentFormControler.update);
routes.get('/payment-forms/:id', PaymentFormControler.show);
routes.delete('/payment-forms/:id', PaymentFormControler.delete);

routes.get('/expenses', ExpenseControler.index);
routes.post('/expenses', ExpenseControler.store);
// routes.put('/expenses/:id', ExpenseControler.update);
// routes.get('/expenses/:id', ExpenseControler.show);

export default routes;
