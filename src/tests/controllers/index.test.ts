import { expect, test, vi } from 'vitest';
import * as repository from '../../repositories';
import { HttpError } from '../../utils/errors';
import * as controller from '../../controllers';

test('controller create ', async t => {
    const stringData = { test: 'asd' };
    const createSpy = vi.spyOn(repository, 'create').mockResolvedValue('created');
    const result = await controller.create(stringData);

    expect(createSpy).toBeCalledWith(stringData);
    expect(result).toEqual('created');
});

test('controller create throws error ', async t => {
    const stringData = '';
    const createSpy = repository.create.

    const result = await controller.create(<any>stringData);
    expect(() => createSpy(HttpError)).toThrowError('500');

    expect(createSpy).toBeCalledWith(stringData);
    expect(result).toEqual('created');
});
