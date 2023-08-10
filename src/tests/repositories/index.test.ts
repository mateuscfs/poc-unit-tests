import { expect, test } from 'vitest';
import * as repository from '../../repositories';

test('repositories create ', async t => {
    const stringData = { testei: 'created' };
    const result = await repository.create(<any>stringData);

    expect(result).toEqual('created');
});

test('repositories getById', async t => {
    const stirngId = 'asd';
    const result = await repository.getById(stirngId);
    expect(result).toEqual('asd');
});

test('repositories updateById Success case', async t => {
    const stringID = 'UUID';
    const data = { nome: 'Voverine' };
    const result = await repository.updateById(stringID, data);

    expect(result).toEqual({ id: 'UUID', nome: 'Voverine' });
});

test('repositories deleteById', async t => {
    const stringID = 'UUID';
    const result = await repository.deleteById(stringID);

    expect(result).toEqual('deleted');
});

test('repositories getAll', async t => {
    const stringGetAll = [{ name: 'getAll' }];
    const result = await repository.getAll();

    expect(result).toEqual(stringGetAll);
});
