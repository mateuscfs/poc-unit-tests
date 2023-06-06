import { Request, Response, Router } from 'express';
import { matchedData } from 'express-validator';
import * as controllers from '../controllers';

const routes = Router();

routes.get('/', (req: Request, res: Response) => {
    res.send('Test Service 1.0.0');
});

routes.post('/create', async (req: Request, res: Response) => {
    const data = <any>matchedData(req, { includeOptionals: false });
    const result = await controllers.create(data)
    res.send(result);
});

routes.get('/:id', async (req: Request, res: Response) => {
    const data = <any>matchedData(req, { includeOptionals: false });
    const result = await controllers.getById(data.id)
    res.send(result);
});


export default routes;