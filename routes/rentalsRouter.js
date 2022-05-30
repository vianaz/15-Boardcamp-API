import { Router } from 'express';

import {
  getRentals,
  postRentals,
  returnRentals,
  deleteRentals,
} from '../controllers/rentalsController.js';

const rentalsRouter = Router();

rentalsRouter.get('/rentals', getRentals);
rentalsRouter.post('/rentals', postRentals);
rentalsRouter.post('/rentals/:id/return', returnRentals);
rentalsRouter.delete('/rentals', deleteRentals);

export default rentalsRouter;
