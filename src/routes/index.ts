import { Request, Response, Router } from 'express';
import { matchedData } from 'express-validator';
import * as controllers from '../controllers';
import * as indexValidators from '../utils/index/validators';

const routes = Router();

routes.get('/', (req: Request, res: Response) => {
    res.send('Test Service 1.0.0');
});

routes.post(
    '/create',
    indexValidators.createValidator,
    async (req: Request, res: Response) => {
        const data = <any>matchedData(req, { includeOptionals: false });
        const result = await controllers.create(data);
        res.status(201).send(result);
    },
);
routes.get(
    '/:id',
    indexValidators.getProfileValidator,
    async (req: Request, res: Response) => {
        const data = <any>matchedData(req, { includeOptionals: false });
        const result = await controllers.getById(data.id);
        res.status(200).send(result);
    },
);

export default routes;
