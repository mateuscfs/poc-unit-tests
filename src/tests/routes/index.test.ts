import test from 'ava';
import sinon from 'sinon';
import request from 'supertest';
import * as controller from '../../controllers';
import { IndexBuilder } from '../testBuilders/indexBuilder';
import { IndexCreateDefinition } from '../../routes/doc/interfaces/index';
import definitionsDocumentation from '../../routes/doc';
import app from '../../app';
import { isParamsInValidationErrors } from '../../utils/validation/validationError';

const { IndexCreate } = definitionsDocumentation as IndexCreateDefinition;

test.serial.afterEach.always(() => {
    sinon.restore();
});

test.serial('Test Service ok', async t => {
    const expected = 'Test Service 1.0.0';
    const res = await request(app).get('/');

    t.deepEqual(res.text, expected);
    t.deepEqual(res.status, 200);
});

test.serial('Route /create', async t => {
    const body = new IndexBuilder()
        .withActive(IndexCreate.properties.active.example)
        .withArray(IndexCreate.properties.array.example)
        .withName(IndexCreate.properties.name.example)
        .withNumber(IndexCreate.properties.number.example)
        .build();

    const createController = sinon.stub(controller, 'create').returns(<any>body);
    const res = await request(app)
        .post('/create')
        .send(body)
        .set('tenantid', 'stringg');

    t.true(createController.calledWithExactly({ ...body, tenantid: 'stringg' }));
    t.deepEqual(res.status, 201);
    t.deepEqual(res.body, body);
});

test.serial('Route /create error', async t => {
    const body = new IndexBuilder()
        .withActive(<any>null)
        .withArray(<any>null)
        .withName(<any>null)
        .withNumber(<any>'invalid')
        .build();

    const createController = sinon.stub(controller, 'create').returns(<any>body);
    const res = await request(app).post('/create').send(body);

    t.true(createController.notCalled);
    t.deepEqual(res.status, 400);
    t.true(
        isParamsInValidationErrors(
            ['active', 'array', 'number', 'name', 'tenantid'],
            res.body.errors,
        ),
    );
});

test.serial('routes get /:id', async t => {
    const id = 'fakeid';
    const getByIdController = sinon.stub(controller, 'getById').returns(<any>id);
    const res = await request(app).get('/:id').send(id).set('tenantid', 'stringg');

    t.true(getByIdController.calledOnce);
    t.deepEqual(res.status, 200);
    t.deepEqual(res.text, 'fakeid');
});

test.serial('routes get /:id error', async t => {
    const id = 'fakeid';
    const getByIdController = sinon.stub(controller, 'getById').returns(<any>id);
    const res = await request(app).get('/:id').send(id);
    t.true(getByIdController.notCalled);
    t.deepEqual(res.status, 400);
    t.true(isParamsInValidationErrors(['tenantid'], res.body.errors));
});
