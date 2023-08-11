import test from 'ava';
import sinon from 'sinon';
import * as repository from '../../repositories';
import * as controller from '../../controllers';
import app from '../../app';
import request from 'supertest';



test.serial('Test Service ok', async t => {
    const expected = 'Test Service 1.0.0';
    const res = await request(app).get('/');

    t.deepEqual(res, expected );

})