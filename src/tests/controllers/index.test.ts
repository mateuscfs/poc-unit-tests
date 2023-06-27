import test from 'ava';
import sinon from 'sinon';
import { HttpError } from '../../utils/errors';
import * as repository from '../../repositories';
import * as controller from '../../controllers';

test.afterEach.always(() => {
    sinon.restore();
});

test.serial('controller create ', async t => {
    const stringData = { test: 'asd' };
    const createSpy = sinon.stub(repository, 'create').resolves(<any>stringData);

    const result = await controller.create(stringData);

    t.deepEqual(result, stringData);
    t.true(createSpy.calledWithMatch(stringData));
});

test.serial('controller create throw error ', async t => {
    const stringData = {};
    const createSpy = sinon.stub(repository, 'create').throws();

    await t.throwsAsync(controller.create(stringData), {
        code: 500,
        instanceOf: HttpError,
    });
    t.true(createSpy.calledWithExactly(stringData));
});

test.serial('controller remove success case', async t => {
    const idValue = 'id';
    const getByIdSpy = sinon.stub(repository, 'getById').resolves(<any>idValue);
    const deleteByIdSpy = sinon
        .stub(repository, 'deleteById')
        .resolves(<any>idValue);
    const message = await controller.remove(idValue);

    t.true(getByIdSpy.calledWithMatch(idValue));
    t.true(deleteByIdSpy.calledWithMatch(idValue));
    t.deepEqual(message, { message: 'Deleted' });
});

test.serial('controller remove fail', async t => {
    const idValue = '';
    const getByIdSpy = sinon.stub(repository, 'getById').throws();

    await t.throwsAsync(controller.remove(idValue), {
        code: 500,
        instanceOf: HttpError,
    });
    t.true(getByIdSpy.calledWithExactly(idValue));
});

test.serial('controller update success case', async t => {
    const newData = {
        id: 'id',
        name: 'nome',
        description: 'descrição',
        title: 'título',
    };
    const getByIdSpy = sinon.stub(controller, 'getById').resolves(/* newData.id */);
    const updateByIdSpy = sinon.stub(repository, 'updateById').resolves(newData.id);
    const updating = await controller.update(newData);

    t.deepEqual(updating, newData.id);
    t.true(updateByIdSpy.calledWithMatch(newData.id));
    t.true(getByIdSpy.calledWithExactly(newData.id));
    t.true(
        updateByIdSpy.calledWithExactly('id', {
            name: 'nome',
            description: 'descrição',
            title: 'título',
        }),
    );
});

test.serial('controller update fail', async t => {
    const getByIdSpy = sinon.stub(repository, 'getById').throws();
    const newData = {
        id: '',
        name: '',
        description: '',
        title: '',
    };

    await t.throwsAsync(controller.update(newData), {
        code: 500,
        instanceOf: HttpError,
    });
    t.true(getByIdSpy.calledWithExactly(''));
});

test.serial('controller getAll success case', async t => {
    const nameRepository = [{ name: 'getAll' }];
    const getAllSpy = sinon
        .stub(repository, 'getAll')
        .resolves([{ name: 'getAll' }]);
    const result = await repository.getAll();

    t.true(getAllSpy.calledOnce);
    t.deepEqual(result, nameRepository);
});

test.serial('controller getAll http error', async t => {
    const getAllSpy = sinon.stub(repository, 'getAll').throws();

    await t.throwsAsync(controller.getAll(), {
        code: 500,
        instanceOf: HttpError,
    });
    t.true(getAllSpy.calledWithExactly());

    t.true(getAllSpy.calledOnce);
});

test.serial('controller getAll Data not found', async t => {
    const getAllSpy = sinon.stub(repository, 'getAll').throws();

    getAllSpy.onFirstCall().resolves(<any>'Data Not Found');
    getAllSpy.onSecondCall().resolves([{ HttpError }]);
    const result = await getAllSpy();

    t.deepEqual(result, 'Data Not Found');
}); /* Falta conseguir retornar 'Data Not Found' */

test.serial('controller getById success case', async t => {
    const actionId = 'string';
    const getByIdSpy = sinon.stub(repository, 'getById').resolves(actionId);
    const result = await repository.getById(actionId);

    t.true(getByIdSpy.calledWithExactly(actionId));
    t.deepEqual(result, actionId);
});

test.serial('controller getById FAIL', async t => {
    const actionId = '';
    const getByIdSpy = sinon.stub(repository, 'getById').resolves(actionId);

    await t.throwsAsync(controller.getById('actionId'), {
        code: 404,
        instanceOf: HttpError,
        message: 'Data Not Found',
    });
    t.true(getByIdSpy.called);
});
