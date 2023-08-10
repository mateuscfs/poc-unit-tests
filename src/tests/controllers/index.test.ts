import { expect, test, vi, it } from 'vitest';
import * as repository from '../../repositories';
import { HttpError } from '../../utils/errors';
import * as controller from '../../controllers';

test('controller create', async () => {
    const stringData = { test: 'asd' };
    const createSpy = vi.spyOn(repository, 'create').mockResolvedValue('created');
    const result = await controller.create(<any>stringData);

    expect(createSpy).toBeCalledWith(stringData);
    expect(result).toEqual('created');
});

test('controller create throws error ', async t => {
    const stringData = {};
    vi.spyOn(repository, 'create').mockRejectedValue(stringData);

    await expect(() => controller.create(<any>stringData)).rejects.toBeInstanceOf(
        HttpError,
    );
});

test('remove success case with deleted mock', async () => {
    const deleteByIdSpy = vi
        .spyOn(repository, 'deleteById')
        .mockResolvedValue('deleted');

    const deleteByIdString = { id: 'UUID DELETE' };

    const result = await controller.remove(<any>deleteByIdString);

    expect(deleteByIdSpy).toBeCalledWith(deleteByIdString);
    expect(result).toEqual({ message: 'Deleted' });
});

test('remove success case with getById mock', async () => {
    const getByIdString = { id: 'UUID GET' };
    const getByIdSpy = vi
        .spyOn(repository, 'getById')
        .mockResolvedValueOnce(<any>getByIdString);
    await controller.getById(<any>getByIdString);
    expect(getByIdSpy).toBeCalledWith(getByIdString);
});

test('update success case UpdateById mock', async () => {
    const data = {
        id: 'UUID GET',
        name: 'Voveirne',
        description: 'Serrote',
        active: true,
        array: ['arrayde', 'stringsss'],
        number: 3,
    };
    const getByIdSpy = vi.spyOn(repository, 'getById').mockResolvedValueOnce('ID');
    const updateByIdSpy = vi.spyOn(repository, 'updateById').mockResolvedValue(data);
    await controller.update(data);
    expect(updateByIdSpy).toBeCalledWith(data.id, {
        name: data.name,
        active: data.active,
        array: data.array,
        number: data.number,
    });
    expect(getByIdSpy).toBeCalledWith(data.id);
});

test('update throws error', async () => {
    const dataId = {};
    vi.spyOn(repository, 'updateById').mockRejectedValueOnce(dataId);
    await expect(() => controller.update(<any>dataId)).rejects.toBeInstanceOf(
        HttpError,
    );
});

test('controllers getAll', async () => {
    const nameGetAll = [{ name: 'getAll' }];
    const getAllSpy = vi
        .spyOn(repository, 'getAll')
        .mockResolvedValue(<any>nameGetAll);
    await controller.getAll();

    expect(getAllSpy).toBeCalled();
});

test('controllers getAll throws error', async () => {
    const nameGetAll = <any>[];
    vi.spyOn(repository, 'getAll').mockResolvedValue(<any>nameGetAll);
    await expect(() => controller.getAll()).rejects.toBeInstanceOf(HttpError);
});

test('controllers getById', async () => {
    const getId = { actionId: 'test' };
    const getByIdSpy = vi.spyOn(repository, 'getById').mockReturnValue(<any>getId);
    await controller.getById(<any>getId);

    expect(getByIdSpy).toBeCalledWith(getId);
});

test('controllers getById throws error', async () => {
    const getId = {};
    vi.spyOn(repository, 'getById').mockReturnValue(<any>getId);
    await expect(() => controller.getAll()).rejects.toBeInstanceOf(HttpError);
});
