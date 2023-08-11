import test from 'ava';
import sinon from 'sinon';
import * as repository from '../../repositories';
import { HttpError } from '../../utils/errors';

test.afterEach.always(() => {
    sinon.restore();
});

test.serial('repositories create ', async t => {
    const stringData = { test: 'created' };
    const createSpy = sinon.stub(repository, 'create').resolves(<any>stringData);
    const result = await repository.create(stringData);

    t.deepEqual(result, stringData);
    t.true(createSpy.calledWithMatch(stringData));
});

test.serial('repositories getById ', async t => {
    const idString = 'UUID';
    const getByIdSpy = sinon.stub(repository, 'getById').resolves(<any>idString);
    const result = await repository.getById(idString);

    t.deepEqual(result, 'UUID');
    t.true(getByIdSpy.calledWithExactly(idString));
});

test.serial('repositories getById is not a string ', async t => {
    const idString = { id: '' };
    const getByIdSpy = sinon.stub(repository, 'getById').resolves(<any>idString);
    const result = await repository.getById('');

    t.notDeepEqual(result, String);
    t.not(typeof getByIdSpy, String);
});

test.serial('repositories updateById test 12345 voverine ', async t => {
    const id = 'UUID';
    const data = { nome: <any>'Voverine' };
    const updateByIdSpy = sinon.stub(repository, 'updateById').resolves();
    await repository.updateById(id, data);

    t.true(updateByIdSpy.calledOnce);
    t.true(updateByIdSpy.calledWithExactly(id, data));
});

test.serial('repositories updateById error', async t => {
    const id = {};
    const data = '';
    sinon.stub(repository, 'updateById').resolves();

    t.is(typeof data, 'string', 'Deveria ser objeto.');
    t.is(typeof id, 'object', 'Deveria ser String');
});

test.serial('deleteById success case', async t => {
    const deleteByIdSpy = sinon.stub(repository, 'deleteById').resolves('UUID');
    const idToDelete = 'UUID';
    await repository.deleteById(idToDelete);
    t.true(deleteByIdSpy.calledWithExactly('UUID'));
});

test.serial('repositories deletedById error - not a string ', async t => {
    const idToDelete = {};
    sinon.stub(repository, 'getById').resolves(<any>idToDelete);

    t.is(typeof idToDelete, 'object', 'Deveria ser String');
});

test.serial('repositories getAll success case', async t => {
    const nameTest = { name: 'getAll' };
    const getAllSpy = sinon.stub(repository, 'getAll').resolves([nameTest]);
    const resultado = await repository.getAll();

    t.deepEqual(resultado, [{ name: 'getAll' }]);
    t.true(getAllSpy.calledOnce);
});

test.serial('repositories getAll error', async t => {
    const nameTest = { name: '123' };
    const getAllSpy = sinon.stub(repository, 'getAll').resolves([nameTest]);
    const resultado = await repository.getAll();

    t.not(resultado, [{ name: 'getAll' }]);
    t.true(getAllSpy.calledOnce);
});
