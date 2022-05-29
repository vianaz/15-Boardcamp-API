import { Router } from 'express';

import {
  getCustomers,
  postCustomers,
  putCustomers,
} from '../controllers/customersController.js';

const customersRouter = Router();

customersRouter.get('/customers', getCustomers);
customersRouter.post('/customers', postCustomers);
customersRouter.put('/customers/:id', putCustomers);

export default customersRouter;
