import { Request, Response, Router, request } from 'express';
import { matchedData } from 'express-validator';
import { expect, test, vi } from 'vitest';
import * as repository from '../../repositories';
import { HttpError } from '../../utils/errors';
import * as controller from '../../controllers';

test.only('GET /', async t => {
    const expected = 'Test Service 1.0.0';

    await request.get('/');

    expect(expected).toEqual('Test Service 1.0.0');
});

test('routes get /:id test', async () => {
    const data = matchedData(req, { includeOptionals: false });
    const getByIdSpy = vi
        .spyOn(repository, 'getById')
        .mockResolvedValue(requestData.id);
    const res = await controller.getById(<any>requestData);

    expect(createSpy).toBeCalledWith(stringData);
    expect(result).toEqual('created');
});

test('routes post /create', async () => {
    const dataId = 'testData';
    const createSpy = vi.spyOn(repository, 'create').mockRejectedValue(dataId);
});
