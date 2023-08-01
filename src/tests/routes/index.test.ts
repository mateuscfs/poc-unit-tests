import { Request, Response, Router } from 'express';
import { matchedData } from 'express-validator';
import { expect, test, vi } from 'vitest';
import request from 'supertest';
import * as repository from '../../repositories';
import { IndexBuilder } from '../testBuilders/indexBuilder';
import * as controller from '../../controllers';
import { HttpError } from '../../utils/errors';

import app from '../../app';
import {
    IndexCreateDefinition,
    IndexUpdateDefinition,
} from '../../routes/doc/interfaces/index';
import definitionsDocumentation from '../../routes/doc';

const { IndexCreate } = definitionsDocumentation as IndexCreateDefinition;
const { IndexUpdate } = definitionsDocumentation as IndexUpdateDefinition;

/* test('GET /', async t => {
    const expected = 'Test Service 1.0.0';

    await request.(get)('/');

    expect(expected).toEqual('Test Service 1.0.0');
}); */

test('routes post /create', async () => {
    const body = new IndexBuilder()
        .withActive(IndexCreate.properties.active.example)
        .withArray(IndexCreate.properties.array.example)
        .withName(IndexCreate.properties.name.example)
        .withNumber(IndexCreate.properties.number.example)
        .build();

    const createController = vi.spyOn(controller, 'create').mockResolvedValue(body);
    const res = await request(app)
        .post('/create')
        .send(body)
        .set('tenantid', 'stringg');

    expect(createController).toBeCalledWith({ ...body, tenantid: 'stringg' });
    expect(res.status).toBe(201);
});

test.only('routes post /create error', async () => {
    const body = '';
    const res = await request(app)
        .post('/create')
        .send(body)
        .set('tenantid', 'stringg');
    expect(res.body).toEqual({
        error: 'Erro ao criar recurso',
    });
    expect(res.status).toBe(500);
});

test('routes get /:id', async () => {
    const data = { id: 'fakeId' };

    const getByIdController = vi
        .spyOn(controller, 'getById')
        .mockResolvedValue(data.id);
    const res = await request(app).get('/:id').send(data.id).set('id', 'fakeId');

    expect(getByIdController).toBeCalled();
    expect(res.status).toBe(200);
});

test('routes get /:id error', async () => {
    const data = { id: '' };

    const getByIdControllerSpy = vi
        .spyOn(controller, 'getById')
        .mockResolvedValue(null);
    const res = await request(app).get('/:id').send(data.id).set('id', 'fakeId');

    await expect(getByIdControllerSpy).toThrow(new HttpError(404, 'Data Not Found'));
    expect(res.status).toBe(404);
});
