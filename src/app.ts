/* eslint-disable */
import 'reflect-metadata';
import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';

require('express-async-errors');

import routes from './routes';
import { HttpError } from './utils/errors';

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
    }

    private config(): void {
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(App.errorHandling);
        this.app.use(routes);
        this.app.disable('x-powered-by');
    }

    private static errorHandling(
        error: Error | HttpError,
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        const { code, message, errors } = <any>error;

        const apiError = {
            resource: 'Auth Service',
            code: code || 500,
            message: message || `Erro desconhecido na rota ${req.path}`,
            errors,
        };

        return res.status(code).send(apiError);
    }
}

export default new App().app;
