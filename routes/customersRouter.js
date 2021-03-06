import { Router } from 'express';

import {
  getCustomerById,
  getCustomers,
  postCustomers,
  putCustomers,
} from '../controllers/customersController.js';

const customersRouter = Router();

customersRouter.get('/customers', getCustomers);
customersRouter.get('/customers/:id', getCustomerById);
customersRouter.post('/customers', postCustomers);
customersRouter.put('/customers/:id', putCustomers);

export default customersRouter;
