import { Request, Response, Router } from 'express';
import * as controllers from '../controllers';
import * as indexValidators from '../utils/index/validators';
import { getValidData } from '../utils/validation/validationHandler';

const routes = Router();

routes.get('/', (req: Request, res: Response) => {
    res.send('Test Service 1.0.0');
    console.log(res.status);
});

routes.post(
    '/create',
    indexValidators.createValidator,
    async (req: Request, res: Response) => {
        const { body, headers } = getValidData(req);
        const result = await controllers.create({
            ...body,
            tenantid: headers.tenantid,
        });
        res.status(201).send(result);
    },
);
routes.get(
    '/:id',
    indexValidators.getProfileValidator,
    async (req: Request, res: Response) => {
        const { params } = getValidData(req);
        const result = await controllers.getById(params.id);
        res.status(200).send(result);
    },
);

export default routes;
