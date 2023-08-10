import { expect, test, vi } from 'vitest';
import request from 'supertest';
import { IndexBuilder } from '../testBuilders/indexBuilder';
import * as controller from '../../controllers';

import app from '../../app';
import { IndexCreateDefinition } from '../../routes/doc/interfaces/index';
import definitionsDocumentation from '../../routes/doc';

const { IndexCreate } = definitionsDocumentation as IndexCreateDefinition;

test('GET /', async t => {
    const expected = 'Test Service 1.0.0';

    const res = await request(app).get('/');

    expect(res.text).toEqual(expected);
    expect(res.status).toBe(200);
});

test('routes post /create', async () => {
    const body = new IndexBuilder()
        .withActive(IndexCreate.properties.active.example)
        .withArray(IndexCreate.properties.array.example)
        .withName(IndexCreate.properties.name.example)
        .withNumber(IndexCreate.properties.number.example)
        .build();

    const createController = vi
        .spyOn(controller, 'create')
        .mockResolvedValue(<any>body);
    const res = await request(app)
        .post('/create')
        .send(body)
        .set('tenantid', 'stringg');

    expect(createController).toBeCalledWith({ ...body, tenantid: 'stringg' });
    expect(res.status).toBe(201);
    expect(res.body).toStrictEqual(body);
});

test('routes get /:id', async () => {
    const id = 'fakeId';

    const getByIdController = vi.spyOn(controller, 'getById').mockResolvedValue(id);
    const res = await request(app).get('/:id').send(id).set('tenantid', 'stringg');

    expect(getByIdController).toBeCalled();
    expect(res.status).toBe(200);
    expect(res.text).toBe('fakeId');
});
